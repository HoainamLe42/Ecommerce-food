import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { Fragment } from 'react/jsx-runtime';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import HotlineButton from './components/HotlineButton';
import { ShoppingCartProvider } from './context/StoreContext';
import { AdminProvider } from './context/AdminContext';
import { BlogProvider } from './context/BlogContext';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
    return (
        <AdminProvider>
            <ShoppingCartProvider>
                <BlogProvider>
                    <Router>
                        <ScrollToTop />
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    const Page = route.component;

                                    let Layout =
                                        route.layout === null
                                            ? Fragment
                                            : route.layout || DefaultLayout;

                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Routes>
                        </Suspense>
                        <ScrollToTopButton />
                        <HotlineButton />
                    </Router>
                </BlogProvider>
            </ShoppingCartProvider>
        </AdminProvider>
    );
};

export default App;
