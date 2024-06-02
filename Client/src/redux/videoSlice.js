import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      const userId = action.payload;
      const likesIndex = state.currentVideo.likes.findIndex(id => id === userId);
      const dislikesIndex = state.currentVideo.dislikes.findIndex(id => id === userId);
      
      if (likesIndex !== -1) {
        // User has already liked the video, so remove their like
        state.currentVideo.likes.splice(likesIndex, 1);
      } else {
        // User has not liked the video, so add their like and remove any dislike
        state.currentVideo.likes.push(userId);
        if (dislikesIndex !== -1) {
          state.currentVideo.dislikes.splice(dislikesIndex, 1);
        }
      }
    },
    
    dislike: (state, action) => {
      const userId = action.payload;
      const likesIndex = state.currentVideo.likes.findIndex(id => id === userId);
      const dislikesIndex = state.currentVideo.dislikes.findIndex(id => id === userId);
      
      if (dislikesIndex !== -1) {
        // User has already disliked the video, so remove their dislike
        state.currentVideo.dislikes.splice(dislikesIndex, 1);
      } else {
        // User has not disliked the video, so add their dislike and remove any like
        state.currentVideo.dislikes.push(userId);
        if (likesIndex !== -1) {
          state.currentVideo.likes.splice(likesIndex, 1);
        }
      }
    },
    
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like ,dislike} =
  videoSlice.actions;

export default videoSlice.reducer;