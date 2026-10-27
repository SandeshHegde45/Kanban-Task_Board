import { showToast } from "../toast/toastSlice";

// Right after logging in, tell people what happened while they were away.
export const announceUnread = (userId) => (dispatch, getState) => {
  const count = getState().notifications.filter((n) => n.userId === userId && !n.read).length;
  if (count) dispatch(showToast({ message: `You have ${count} new ${count === 1 ? "notification" : "notifications"}` }));
};
