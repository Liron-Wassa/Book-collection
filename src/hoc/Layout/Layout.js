import NavBar from '../../components/UI/NavBar/NavBar';
import React from 'react';

const Layout = (props) => (
    <React.Fragment>
        <header>
            <NavBar />
        </header>
        <main>
            {props.children}
        </main>
    </React.Fragment>
);

export default Layout;