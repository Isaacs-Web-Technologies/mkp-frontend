import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '@/components/axiosInstance';
import { store } from '@/redux/store';
import Cookies from "js-cookie";


export async function* getIterableStream(body) {
  const reader = body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      break
    }
    const decodedChunk = decoder.decode(value, { stream: true })
    yield decodedChunk
  }
}

// Async thunk for sending a message to AI
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ( { message, thread_id },{ rejectWithValue, dispatch }) => {
    var payload = {query: message};
    var isNewThread = true;
    dispatch(chatSlice.actions.addQuery(message));
    try {
      if (thread_id !== null) {
        payload.thread_id = thread_id;
        isNewThread = false;
      }
      const response = await AxiosInstance.post(`/chat/?stream=true`, payload);
      console.log("API response:", response);
      if (response.status !== 201 && response.status !== 200) {
        throw new Error(response.statusText);
      }
      thread_id = response.data.chat.thread_id;
      
      dispatch(chatSlice.actions.addResponse({
        query : {
          content: message,
          id: response.data.chat.previous_chat_id,
        },
        response: {
          content: response.data.chat.content,
          id: response.data.chat.id,
        },
        thread_id: thread_id,
      }));
      // If this is a new thread, we need to update the thread_id
      // in the redux store
      if (isNewThread) {
        dispatch(chatSlice.actions.updateActiveThreadId(thread_id));
      }
      // Start streaming the response
      if (response.data.streaming === true) {
        setTimeout(() => {
        store.dispatch(streamResponse({
          thread_id: thread_id,
          response_id: response.data.chat.id
        }));
        }, 1000);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const streamResponse = createAsyncThunk(
  'chat/streamResponse',
  async ({thread_id, response_id}, {rejectWithValue, dispatch}) => {
    try {
      const response = await fetch(
        `https://mkpbackend-fe1c9f5599b1.herokuapp.com/chat/stream/${response_id}`,
        {method: 'GET', headers: {'Authorization': `Bearer ${Cookies.get('token')}`}}
      );

      console.log("API response:", response);
      if (response.status !== 200) {
        return rejectWithValue(response.statusText);
      }
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedChunk = new TextDecoder().decode(value);
        console.log(`Got chunk: ${decodedChunk}`);
        dispatch(chatSlice.actions.onNewChunk({
          thread_id: thread_id,
          response_id: response_id,
          content: decodedChunk
        }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const getAllThreads = createAsyncThunk(
  'chat/getAllThreads',
  async (payload, {rejectWithValue, dispatch}) => {
    try {
      const response = await AxiosInstance.get(`/chat/threads`);
      console.log("API response:", response);
      if (response.status !== 200) {
        return rejectWithValue(response.statusText);
      }
      const threads = response.data.threads.map(thread => ({
        id: thread.id,
        title: thread.title,
        messages: []
      }));
      dispatch(chatSlice.actions.setThreads(threads));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const editThreadTitle = createAsyncThunk(
  'chat/editThreadTitle',
  async ({title, thread_id}, {rejectWithValue, dispatch}) => {
    dispatch(chatSlice.actions.setThreadTitle({title: title, thread_id: thread_id}));
    const response = await AxiosInstance.patch(`/chat/thread/${thread_id}`, {title: title});
    console.log("API response:", response);
    if (response.status !== 200) {
      return rejectWithValue(response.statusText);
    }
  }
)

export const deleteThread = createAsyncThunk(
  'chat/deleteThread',
  async ({thread_id}, {rejectWithValue, dispatch}) => {
    dispatch(chatSlice.actions.setThreads(
      store.getState().chat.threads
      .filter(thread => thread.id !== thread_id))
    );
    dispatch(chatSlice.actions.startNewThread());
    const response = await AxiosInstance.delete(`/chat/thread/${thread_id}`);
    console.log("API response:", response);
    if (response.status !== 200) {
      return rejectWithValue(response.statusText);
    }
  }
)

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async ({thread_id}, {rejectWithValue, dispatch}) => {
    var messages = store.getState().chat.threads.find(t => t.id === thread_id)?.messages || [];
    dispatch(chatSlice.actions.openThread({thread_id, messages}));
    if (messages.length > 0) {
      return;
    }
    const response = await AxiosInstance.get(`/chat/all?thread_id=${thread_id}`);
    console.log("API response:", response);
    if (response.status !== 200) {
      return rejectWithValue(response.statusText);
    }
    const chats = response.data.chats;
    messages = chats.map(chat => ({
      content: chat.content,
      id: chat.id,
      sender: chat.chat_type == 'RESPONSE' ? 'ai' : 'user'
    }));
    dispatch(chatSlice.actions.openThread({thread_id, messages}));
  }
)


export const deleteAllThreads = createAsyncThunk(
  'chat/deleteAllThreads',
  async (payload, {rejectWithValue, dispatch}) => {
    dispatch(chatSlice.actions.setThreads([]));
    dispatch(chatSlice.actions.startNewThread());
    const response = await AxiosInstance.delete(`/chat/threads`);
    console.log("API response:", response);
    if (response.status !== 200) {
      return rejectWithValue(response.statusText);
    }
  }
)


// Async thunk for deleting a message
// export const deleteMessage = createAsyncThunk(
//   'chat/deleteMessage',
//   async (thread_id, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.delete(`/chat/all${thread_id}`);
//       if (response.status !== 200) throw new Error(response.statusText);
//       return thread_id;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    threads: [],
    activeThreadId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
    setThreadTitle: (state, action) => {
      const thread = state.threads.find(t => t.id === action.payload.thread_id);
      if (thread === undefined) return;
      thread.title = action.payload.title;
    },
    setMessages: (state, action) => {
      const thread = state.threads.find(t => t.id === action.payload.thread_id);
      if (thread === undefined) return;
      thread.messages = action.payload;
    },
    openThread: (state, action) => {
      state.activeThreadId = action.payload.thread_id;
      const thread = state.threads.find(t => t.id === action.payload.thread_id);
      if (thread === undefined) return;
      thread.messages = action.payload.messages;
    },
    updateActiveThreadId: (state, action) => {
      state.activeThreadId = action.payload;
    },
    addQuery: (state, action) => {
      const activeThread = state.threads.find(t => t.id === state.activeThreadId);
      if (activeThread) {
        activeThread.messages.push({
          content: action.payload,
          sender: 'user',
          id: `${Date.now()}`, // Placeholder ID
        });
      }
    },
    onNewChunk: (state, action) => {
      const activeThread = state.threads.find(t => t.id === action.payload.thread_id);
      if (activeThread === undefined) return;
      const response = activeThread.messages.find(msg => msg.id === action.payload.response_id);
      if (response === undefined) return;
      response.content += `${action.payload.content}`;
    },
    addResponse: (state, action) => {
      const thread = state.threads.find(t => t.id === action.payload.thread_id || t.id === state.activeThreadId);
      if (thread === undefined) return;
      if (thread.id === null) {
        thread.id = action.payload.thread_id;
      }
      
      // replace placeholder ID with actual ID
      const query = thread.messages[thread.messages.length - 1];
      query.id = action.payload.query.id;
      thread.messages.push({
        content: action.payload.response.content,
        sender: 'ai',
        id: action.payload.response.id,
      });
    },
    startNewThread: (state, action) => {
      var thread = state.threads.find(t => t.id === null)
      if (thread !== undefined) {
        state.activeThreadId = thread.id;
        state.messages = thread.messages;
        return;
      }
      thread = {
        id: null,
        title: "New Recipe",
        messages: []
      };
      state.threads.splice(0, 0, thread);
      state.activeThreadId = thread.id;
    },
    removeMessage: (state, action) => {
      const activeThread = state.threads.find(t => t.id === state.activeThreadId);
      if (activeThread) {
        activeThread.messages = activeThread.messages.filter(msg => msg.id !== action.payload);
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "idle"
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  //     .addCase(deleteMessage.fulfilled, (state, action) => {
  //       const activeThread = state.threads.find(t => t.id === state.activeThreadId);
  //   if (activeThread) {
  //     activeThread.messages = activeThread.messages.filter(msg => msg.id !== action.payload);
  //   }
  // });
},
});
export const {
  startNewThread, removeMessage,
  setThreads, openThread, updateActiveThreadId,
  setMessages
} = chatSlice.actions; // Exporting actions
export default chatSlice.reducer;
