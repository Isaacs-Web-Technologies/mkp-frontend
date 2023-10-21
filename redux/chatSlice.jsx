import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '@/components/axiosInstance';

// Async thunk for sending a message to AI
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ( { message, thread_id },{ rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`/chat/`, { query: message });
      console.log("API response:", response);
      if (response.status !== 201 && response.status !== 200) throw new Error(response.statusText);
      console.log("threadId: ", thread_id);
      return {data: response.data, thread_id };
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
    activeThreadId: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    startNewThread: (state, action) => {
      state.threads.push({
        id: action.payload,
        messages: []
      });
      state.activeThreadId = action.payload;
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
        const thread = state.threads.find(t => t.id === action.payload.thread_id);
        if (thread) {
          thread.messages.push({
            content: action.payload.data.content,
            sender: 'user',
            id: action.payload.data.id
          });
        
          // Let's assume the AI's response comes in the same payload 
          thread.messages.push({
            content: action.payload.data.aiResponse,
            sender: 'ai',
            id: `ai_${action.payload.data.id}`
          });
        }
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
export const { startNewThread, removeMessage, deleteThread } = chatSlice.actions; // Exporting actions

export default chatSlice.reducer;
