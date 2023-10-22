import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '@/components/axiosInstance';
import { store } from '@/redux/store';
// Async thunk for sending a message to AI
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ( { message, thread_id },{ rejectWithValue }) => {
    var payload = {query: message};
    var isNewThread = true;
    store.dispatch(chatSlice.actions.addQuery(message));
    try {
      if (thread_id !== null) {
        payload.thread_id = thread_id;
        isNewThread = false;
      }
      const response = await AxiosInstance.post(`/chat/`, payload);
      console.log("API response:", response);
      if (response.status !== 201 && response.status !== 200) {
        throw new Error(response.statusText);
      }
      thread_id = response.data.chat.thread_id;
      // If this is a new thread, we need to update the thread_id
      // in the redux store
      if (isNewThread) {
        store.dispatch(chatSlice.actions.startNewThread(thread_id));
      }
      console.log("threadId: ", thread_id);

      return {
        query: {
          content: message,
          id: response.data.chat.previous_chat_id,
        },
        response: {
          content: response.data.chat.content,
          id: response.data.chat.id,
        },
        thread_id: thread_id,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    isNewThread: true,
    status: 'idle',
    error: null,
  },
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
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
      console.log("updateActiveThreadId: ", action.payload);
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
    startNewThread: (state, action) => {
      var thread = state.threads.find(t => t.id === null)
      if (thread !== undefined) {
        state.activeThreadId = thread.id;
        state.messages = thread.messages;
        return;
      }
      thread = {
        id: null,
        title: "New Thread",
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
    },
    // deleteThread: (state, action) => {
    //   state.threads = state.threads.filter(thread => thread.id !== action.payload);
    //   if (state.activeThreadId === action.payload) {
    //     state.activeThreadId = null;
    //   }
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const thread = state.threads.find(t => t.id === null || t.id === action.payload.thread_id);
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
  startNewThread, removeMessage, deleteThread,
  setThreads, openThread, updateActiveThreadId,
  setMessages
} = chatSlice.actions; // Exporting actions
export default chatSlice.reducer;
