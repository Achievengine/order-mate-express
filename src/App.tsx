
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { TableProvider } from "@/context/TableContext";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import MenuItemDetail from "./pages/MenuItemDetail";
import MyOrders from "./pages/MyOrders";
import CallWaiter from "./pages/CallWaiter";
import Bill from "./pages/Bill";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Create a new client with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TableProvider>
          <OrdersProvider>
            <CartProvider>
              <FavoritesProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner position="top-right" closeButton />
                  <BrowserRouter>
                    <Routes>
                      <Route element={<Layout />}>
                        <Route path="/" element={<Index />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/menu/:id" element={<MenuItemDetail />} />
                        <Route path="/my-orders" element={<MyOrders />} />
                        <Route path="/call-waiter" element={<CallWaiter />} />
                        <Route path="/bill" element={<Bill />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </FavoritesProvider>
            </CartProvider>
          </OrdersProvider>
        </TableProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
