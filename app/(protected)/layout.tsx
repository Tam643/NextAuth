

const Layout = ({ children } : { children : React.ReactNode}) : React.ReactNode =>{
    return (
        <main className="h-full flex items-center justify-center bg-sky-500 from-sky-400 to-blue-500">
            {children}
        </main>
    );
}

export default Layout;