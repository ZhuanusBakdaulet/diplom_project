export default function({ store, redirect }) {
  if (!store.state.auth.user || !store.state.auth.user.loggedIn) {
    if (
      !(
        store.state.auth?.user?.user_type == "C" ||
        store.state.auth?.user?.user_type == "S" ||
        store.state.auth?.user?.user_type == "P"
      )
    )
      return redirect("/provider/Login");
  }
}
