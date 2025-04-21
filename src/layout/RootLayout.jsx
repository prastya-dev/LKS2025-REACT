import { Outlet } from "react-router-dom";

function RootLayout(){
    return (
    <div
    style={{
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f0f0'
    }}
  >
    <Outlet />
  </div>
  );
}
export default RootLayout;