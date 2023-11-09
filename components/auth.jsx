"use client";

import AxiosInstance from "@/components/axiosInstance";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";


import toast from "react-hot-toast";

function shouldRefreshLogin() {
    // Check if the access_token is expired,
    // but the refresh_token is still valid
    const atoken = Cookies.get('atoken');
    const rtoken = Cookies.get('rtoken');

    if (!atoken && rtoken) {
        return true;
    }
}

function shouldLogin() {
    // Check if the access_token is expired,
    // and the refresh_token is expired
    const atoken = Cookies.get('atoken');
    const rtoken = Cookies.get('rtoken');

    if (!atoken && !rtoken) {
        return true;
    }
}


async function performLogout() {
    // Handle user login
    const response = await AxiosInstance.post('/auth/logout');

    // handle response
    console.log(response.data);

    if (response.status === 200) {
        Cookies.remove('atoken');
        Cookies.remove('rtoken');
        Cookies.remove('userType');
        Cookies.remove('userName');
        Cookies.remove('userId');
        unloadSentryUser();
    }
}


function saveCookies({atoken, atokenExpiry, rtoken, rtokenExpiry, userType, userName, userId}) {
    // Convert the expiryTime to a timestamp
    const atokenExpiryTimestamp = Date.parse(atokenExpiry);
    const rtokenExpiryTimestamp = Date.parse(rtokenExpiry);

    Cookies.set('atoken', atoken, {
        expires: new Date(atokenExpiryTimestamp),
    });
    Cookies.set('rtoken', rtoken, {
        expires: new Date(rtokenExpiryTimestamp),
    });
    Cookies.set('userType', userType, {
        expires: new Date(atokenExpiryTimestamp),
    });
    Cookies.set('userName', userName, {
        expires: new Date(atokenExpiryTimestamp),
    });
    Cookies.set('userId', userId, {
        expires: new Date(atokenExpiryTimestamp),
    });
}


async function performLogin({email, password}) {
    // Handle user login
    var response;
    try {
        response = await AxiosInstance.post('/auth/login', {
            login: email,
            password,
        });
    }
    catch (error) {
        response = error.response;
    }

    // handle response
    console.log(response.data);

    if (response.status === 200) {
        const authInfo = {
            atoken: response.data.auth_info.atoken,
            atokenExpiry: response.data.auth_info.atoken_expiry,
            rtoken: response.data.auth_info.rtoken,
            rtokenExpiry: response.data.auth_info.rtoken_expiry,
            userType: response.data.auth_info.user_type,
            userName: response.data.auth_info.user_name,
            userId: response.data.auth_info.user_id,
        }
        saveCookies(authInfo);
        return "Successfully logged in";
    }
    else if (response.status === 401 || response.status === 404) {
        throw "Invalid email or password";
    }
    else if (response.status === 406) {
        const error = response.data.detail.json;
        var errorMessage = '';
        for (const key in error) {
            for (const message of error[key]) {
                errorMessage += `${message}\n`;
            }
        }
        throw errorMessage;
    } else {
        throw "Something went wrong";
    }
}

async function performSignUp({firstName, email, password}) {
    // Handle user signup
    var response;
    try {
        response = await AxiosInstance.post('/auth/signup', {
            first_name: firstName,
            email,
            password,

        });
    } catch (error) {
        response = error.response;
    }
    
    // handle response
    if (response.status === 201) {
        return "Successfully signed up";
    } else if (response.status === 406) {
        const error = response.data.detail.json;
        var errorMessage = '';
        for (const key in error) {
            for (const message of error[key]) {
                errorMessage += `${message}\n`;
            }
        }
        throw errorMessage;
    } else if (response.status === 422) {
        throw response.data.message;
    } else {
        throw "Something went wrong";
    }
}

async function performRefreshLogin () {
    // Handle user login
    const response = await AxiosInstance.post('/auth/refresh', {}, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('rtoken')}`,
        }
    });

    if (response.status === 200) {
        const authInfo = {
            atoken: response.data.auth_info.atoken,
            atokenExpiry: response.data.auth_info.atoken_expiry,
            rtoken: response.data.auth_info.rtoken,
            rtokenExpiry: response.data.auth_info.rtoken_expiry,
            userType: response.data.auth_info.user_type,
            userName: response.data.auth_info.user_name,
            userId: response.data.auth_info.user_id,
        }
        saveCookies(authInfo);
    }
}

function loadSentryUser() {
    Sentry.setUser({
        id: Cookies.get('userId'),
        username: Cookies.get('userName'),
    });
    console.log("Sentry user loaded");
}

function unloadSentryUser() {
    Sentry.setUser(null);
    console.log("Sentry user unloaded");
}

function useLoggedInUser(deps, loggedInRoute) {
    const router = useRouter();
    const pathName = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log(`current route: ${pathName}`)

    useEffect(() => {
        // Check if the user is logged in
        if (shouldRefreshLogin()) {
            performRefreshLogin();
            return;
        }
        if (shouldLogin()) {
            if (pathName !== '/signIn' && pathName !== '/signUp' && pathName !== '/') {
                toast.error("Please login to continue", {
                    id: "login-error",
                    duration: 2000,
                });
                setTimeout(() => {
                    router.push('/signIn');
                }, 2000);
                return;
            }
            unloadSentryUser();
            return;
        }
        if (loggedInRoute)
            router.push(loggedInRoute);
        setIsLoggedIn(true);
        loadSentryUser();
    }, deps);
    return isLoggedIn;
}

export { performLogin, performSignUp, performLogout, useLoggedInUser, loadSentryUser, unloadSentryUser };