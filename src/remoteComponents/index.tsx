import React from "react";
import ErrorBoundary from "../errorBoundary";
// const RemoteOrderDiv = React.lazy(() => import('dhaam_order_app_ui/OrderDiv'));
const RemoteSettingsConfigs = React.lazy(() => import('dhaam_settings_app_ui/ConfigurationsComponent'));
const RemoteSettingsMarketPlaceDesign = React.lazy(() => import('dhaam_settings_app_ui/MarketPlaceDesignComponent'));
const RemoteSettingsIntegration = React.lazy(() => import('dhaam_settings_app_ui/IntegrationComponent'));
// const RemoteStoreDiv = React.lazy(() => import('dhaam_store_app_ui/StoreDiv'));
// const RemoteAdminDiv = React.lazy(() => import('dhaam_admin_app_ui/AdminDiv'));
// export const RemoteOrderDivComponent = () => {
//     return (
//       <ErrorBoundary errorMessage="Remote Order Div is not available">
//         <React.Suspense fallback={<p>Loading Remote Component ...</p>}>
//           <RemoteOrderDiv />
//         </React.Suspense>
//       </ErrorBoundary>
//     );
//   };

  export const RemoteSettingsConfigsComponent = () => {
    return (
      <ErrorBoundary errorMessage="Remote Settings Configs is not available">
        <React.Suspense fallback={<p>Loading Remote Component ...</p>}>
          <RemoteSettingsConfigs />
        </React.Suspense>
      </ErrorBoundary>
    );
  };

  export const RemoteSettingsMarketPlaceDesignComponent = () => {
    return (
      <ErrorBoundary errorMessage="Remote Settings Market Place Design is not available">
        <React.Suspense fallback={<p>Loading Remote Component ...</p>}>
          <RemoteSettingsMarketPlaceDesign />
        </React.Suspense>
      </ErrorBoundary>
    );
  };

  export const RemoteSettingsIntegrationComponent = () => {
    return (
      <ErrorBoundary errorMessage="Remote Settings Integration is not available">
        <React.Suspense fallback={<p>Loading Remote Component ...</p>}>
          <RemoteSettingsIntegration />
        </React.Suspense>
      </ErrorBoundary>
    );
  };

  // export const RemoteStoreDivComponent = () => {
  //   return (
  //     <ErrorBoundary errorMessage="Remote Store Div is not available">
  //       <React.Suspense fallback={<p>Loading Remote Component ...</p>}>
  //         <RemoteStoreDiv />
  //       </React.Suspense>
  //     </ErrorBoundary>
  //   );
  // };

  // export const RemoteAdminDivComponent = () => {
  //   return (
  //     <ErrorBoundary errorMessage="Remote Admin Div is not available">
  //       <React.Suspense fallback={<p>Loading Remote Component ...</p>}>
  //         <RemoteAdminDiv />
  //       </React.Suspense>
  //     </ErrorBoundary>
  //   );
  // };