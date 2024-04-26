import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '../ui/dashboard/Header';
import SideBar from '../ui/dashboard/Sidebar';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {/* <SideNav /> */}
      <SideBar />
      <div className='flex-grow p-10'>
        {children}
      </div>
      
    </div>
  );
}

{
  /* <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Header />
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div> */
}
