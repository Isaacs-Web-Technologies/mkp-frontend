import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from "@/components/axiosInstance";

//  async thunk for sending a message
export const sendMessageAsync = createAsyncThunk(
  'chat/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`/chat/`, { query: message });
      if (response.status !== 201) throw new Error(response.statusText);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// async thunk for getallmessages
export const getAllMessagesAsync = createAsyncThunk(
    'chat/getAllMessages',
    async (_, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.get(`/chat/allMessages`);
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // async thunk for deleteall messages
  export const deleteAllMessagesAsync = createAsyncThunk(
    'chat/deleteAllMessages',
    async (_, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.delete(`/chat/deleteAllMessages`);
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // async thunk for getsingle chat
  export const getSingleChatAsync = createAsyncThunk(
    'chat/getSingleChat',
    async (chatId, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.get(`/chat/${chatId}`);
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  //async for deletesinglechat
  export const deleteSingleChatAsync = createAsyncThunk(
    'chat/deleteSingleChat',
    async (chatId, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.delete(`/chat/${chatId}`);
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  //aync thunk for readstreamresponseaync
  export const readStreamedResponseAsync = createAsyncThunk(
    'chat/readStreamedResponse',
    async (_, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.get('/chat/stream');
        if (response.status !== 200) {
          throw new Error('Failed to read streamed response');
        }
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    message: [],
    conversation: [],
    status: 'idle',
    error: null,
    threadId: null,
    chatId: null,
    messages: []
  },
  reducers: {
    setMessage: (state, action) => {
      state.message.push(action.payload);
    },
  setConversation: (state, action) => {
      state.conversation = action.payload;
    },
    clearConversation: state => {
      state.conversation = [];
    },
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
     setChatId: (state, action) => { 
      state.chatId = action.payload;
    }
    },
 
    extraReducers: builder => {
        builder
          .addCase(sendMessageAsync.pending, state => {
            state.isLoading = true;
          })
          .addCase(sendMessageAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.threadId = action.payload.threadId;
            state.chatId = action.payload.chatId;
            state.message.push({ 
              content: state.message, 
              role: "system" 
            });
            state.message = '';
          })
          .addCase(sendMessageAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
          })
          .addCase(getAllMessagesAsync.pending, state => {
            state.status = 'loading';
          })
          .addCase(getAllMessagesAsync.fulfilled, (state, action) => {
            state.messages = action.payload;
          })
          .addCase(getAllMessagesAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
          .addCase(deleteAllMessagesAsync.pending, state => {
            state.status = 'loading';
          })
          .addCase(deleteAllMessagesAsync.fulfilled, state => {
            state.status = 'idle';
            state.messages = []; // Clear all messages
          })
          .addCase(deleteAllMessagesAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
          .addCase(getSingleChatAsync.pending, state => {
            state.status = 'loading';
          })
          .addCase(getSingleChatAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.conversation = action.payload; // Assuming the payload is the chat details
          })
          .addCase(getSingleChatAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
          .addCase(deleteSingleChatAsync.pending, state => {
            state.status = 'loading';
          })
          .addCase(deleteSingleChatAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            // Assuming you get the ID of the deleted chat in the payload, 
            // you can filter it out from the messages array (if it's stored there).
            state.messages = state.messages.filter(msg => msg.id !== action.payload.id);
          })
          .addCase(deleteSingleChatAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
          .addCase(readStreamedResponseAsync.pending, state => {
            state.status = 'loading';
          })
          .addCase(readStreamedResponseAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.conversation.push({
                content: action.payload,
                role: 'ai'
            })
            // Depending on your needs, you may want to save the streamed data to the state
            // e.g., state.streamedData = action.payload;
          })
          .addCase(readStreamedResponseAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      }
      
    });

export const {setChatId,setMessage, clearConversation, setThreadId } = chatSlice.actions;

export default chatSlice.reducer;
