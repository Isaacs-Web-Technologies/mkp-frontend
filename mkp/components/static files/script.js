document.addEventListener("DOMContentLoaded", function () {
    // Navbar
    const navbar = document.createElement("header");
    navbar.classList.add(
      "bg-white",
      "left-0",
      "text-slate-800",
      "w-full",
      "ease-in",
      "duration-300",
      "fixed",
      "top-0",
      "z-10"
    );
  
    const navContent = `
      <!-- Your Navbar content here -->
    `;
  
    navbar.innerHTML = navContent;
    document.body.appendChild(navbar);
  
    // Handle hamburger menu click
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  
    // Hero Section
    const heroSection = document.createElement("section");
    heroSection.className = "hero left-0 mx-auto flex-wrap";
  
    const heroContent = `
      <!-- Your Hero Section content here -->
    `;
  
    heroSection.innerHTML = heroContent;
    document.body.appendChild(heroSection);
  
    // Search Bar Section
    const searchBarSection = document.createElement("section");
    searchBarSection.className = "relative w-full lg:max-w-[75%] max-w-md mx-auto pt-12 pb-10 font-poppins";
  
    const searchBarContent = `
      <!-- Your Search Bar Section content here -->
    `;
  
    searchBarSection.innerHTML = searchBarContent;
    document.body.appendChild(searchBarSection);
  
    // Latest Recipes Section
    const latestRecipesSection = document.createElement("section");
    latestRecipesSection.className = "font-poppins";
  
    const latestRecipesContent = `
      <!-- Your Latest Recipes Section content here -->
    `;
  
    latestRecipesSection.innerHTML = latestRecipesContent;
    document.body.appendChild(latestRecipesSection);
  
    // Fresh from Community Section
    const freshFromCommunitySection = document.createElement("section");
    freshFromCommunitySection.className = "font-poppins";
  
    const freshFromCommunityContent = `
      <!-- Your Fresh from Community Section content here -->
    `;
  
    freshFromCommunitySection.innerHTML = freshFromCommunityContent;
    document.body.appendChild(freshFromCommunitySection);
  
    // Explore Nigerian Recipes Section
    const exploreNigerianRecipesSection = document.createElement("section");
    exploreNigerianRecipesSection.className = "font-poppins";
  
    const exploreNigerianRecipesContent = `
      <!-- Your Explore Nigerian Recipes Section content here -->
    `;
  
    exploreNigerianRecipesSection.innerHTML = exploreNigerianRecipesContent;
    document.body.appendChild(exploreNigerianRecipesSection);
  
    // Footer Section
    const footerSection = document.createElement("footer");
    footerSection.className = "mt-12 bg-gray py-16 text-left text-white font-poppins";
  
    const footerContent = `
      <!-- Your Footer Section content here -->
    `;
  
    footerSection.innerHTML = footerContent;
    document.body.appendChild(footerSection);
  
    // Rest of your logic for event listeners, data fetching, etc.
  });
  