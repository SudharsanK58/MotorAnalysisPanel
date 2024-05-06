import React, { useLayoutEffect } from "react";
import { Routes,Route, useLocation } from "react-router-dom";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";

import Sales from "../pages/Sales";
import Crypto from "../pages/Crypto";
import Analytics from "../pages/Analytics";
import Invest from "../pages/Invest";

import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Avatar from "../pages/components/Avatar";
import Badges from "../pages/components/Badges";
import Breadcrumbs from "../pages/components/Breadcrumbs";
import ButtonGroup from "../pages/components/ButtonGroup";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Carousel from "../pages/components/Carousel";
import Dropdowns from "../pages/components/Dropdowns";
import FormElements from "../pages/components/forms/FormElements";
import FormLayouts from "../pages/components/forms/FormLayouts";
import FormValidation from "../pages/components/forms/FormValidation";
import FormValidation2 from "../pages/components/forms/devicePrecheck";
import AppBenchMarkTicketSearch from "../pages/components/forms/AppBenchMarkTicketSearch";
import SearchByClient from "../pages/components/forms/SearchByClient";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import Typography from "../pages/components/Typography";
import UtilBorder from "../pages/components/UtilBorder";
import UtilColors from "../pages/components/UtilColors";
import UtilDisplay from "../pages/components/UtilDisplay";
import UtilEmbeded from "../pages/components/UtilEmbeded";
import UtilFlex from "../pages/components/UtilFlex";
import UtilOthers from "../pages/components/UtilOthers";
import UtilSizing from "../pages/components/UtilSizing";
import UtilSpacing from "../pages/components/UtilSpacing";
import UtilText from "../pages/components/UtilText";

import Blank from "../pages/others/Blank";
import Faq from "../pages/others/Faq";
import Regularv1 from "../pages/others/Regular-1";
import Regularv2 from "../pages/others/Regular-2";
import Terms from "../pages/others/Terms";
import BasicTable from "../pages/components/table/BasicTable";
import SpecialTablePage from "../pages/components/table/SpecialTable";
import DataTablePage from "../pages/components/table/DataTable";
import ChartPage from "../pages/components/charts/Charts";
import KnobPreview from "../pages/components/charts/KnobPreview";
import EmailTemplate from "../pages/components/email-template/Email";
import NioIconPage from "../pages/components/crafted-icons/NioIcon";
import SVGIconPage from "../pages/components/crafted-icons/SvgIcons";

import ProjectCardPage from "../pages/pre-built/projects/ProjectCard";
import ProjectListPage from "../pages/pre-built/projects/ProjectList";
import UserListRegular from "../pages/pre-built/user-manage/UserListRegular";
import UserContactCard from "../pages/pre-built/user-manage/UserContactCard";
import UserDetails from "../pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "../pages/pre-built/user-manage/UserListCompact";
import UserProfileRegular from "../pages/pre-built/user-manage/UserProfileRegular";
import UserProfileSetting from "../pages/pre-built/user-manage/UserProfileSetting";
import UserProfileNotification from "../pages/pre-built/user-manage/UserProfileNotification";
import UserProfileActivity from "../pages/pre-built/user-manage/UserProfileActivity";
import KycListRegular from "../pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "../pages/pre-built/kyc-list-regular/kycDetailsRegular";
import TransListBasic from "../pages/pre-built/trans-list/TransListBasic";
import TransListCrypto from "../pages/pre-built/trans-list/TransListCrypto";
import ProductCard from "../pages/pre-built/products/ProductCard";
import ProductList from "../pages/pre-built/products/ProductList";
import ProductDetails from "../pages/pre-built/products/ProductDetails";
import InvoiceList from "../pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "../pages/pre-built/invoice/InvoiceDetails";
import InvoicePrint from "../pages/pre-built/invoice/InvoicePrint";
import PricingTable from "../pages/pre-built/pricing-table/PricingTable";
import TicketBenchMark from "../pages/pre-built/pricing-table/ticketBenchMarkPage";
import GalleryPreview from "../pages/pre-built/gallery/GalleryCardPreview";

import AppMessages from "../pages/app/messages/Messages";
import Chat from "../pages/app/chat/ChatContainer";
import Calender from "../pages/app/calender/Calender";
import Kanban from "../pages/app/kanban/Kanban";
import Inbox from "../pages/app/inbox/Inbox";
import DateTimePicker from "../pages/components/forms/DateTimePicker";
import AdvancedControls from "../pages/components/forms/AdvancedControls";
import CheckboxRadio from "../pages/components/forms/CheckboxRadio";
import InputGroup from "../pages/components/forms/InputGroup";
import FormUpload from "../pages/components/forms/FormUpload";
import NumberSpinner from "../pages/components/forms/NumberSpinner";
import NouiSlider from "../pages/components/forms/nouislider";
import WizardForm from "../pages/components/forms/WizardForm";
import QuillPreview from "../pages/components/forms/rich-editor/QuillPreview";
import TinymcePreview from "../pages/components/forms/rich-editor/TinymcePreview";


import FileManager from "../pages/app/file-manager/FileManager";
import FileManagerFiles from "../pages/app/file-manager/FileManagerFiles";
import FileManagerShared from "../pages/app/file-manager/FileManagerShared";
import FileManagerStarred from "../pages/app/file-manager/FileManagerStarred";
import FileManagerRecovery from "../pages/app/file-manager/FileManagerRecovery";
import FileManagerSettings from "../pages/app/file-manager/FileManagerSettings";
import CardWidgets from "../pages/components/widgets/CardWidgets";
import ChartWidgets from "../pages/components/widgets/ChartWidgets";
import RatingWidgets from "../pages/components/widgets/RatingWidgets";
import SlickPage from "../pages/components/misc/Slick";
import JsTreePreview from "../pages/components/misc/JsTree";
import ReactToastify from "../pages/components/misc/ReactToastify";
import SweetAlertPage from "../pages/components/misc/SweetAlert";
import BeautifulDnd from "../pages/components/misc/BeautifulDnd";
import DualListPage from "../pages/components/misc/DualListbox";
import GoogleMapPage from "../pages/components/misc/GoogleMap";

import Error404Classic from "../pages/error/404-classic";
import Error404Modern from "../pages/error/404-modern";
import Error504Modern from "../pages/error/504-modern";
import Error504Classic from "../pages/error/504-classic";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Success from "../pages/auth/Success";

import Layout from "../layout/Index";
import LayoutNoSidebar from "../layout/Index-nosidebar";
import PrivateRoutes from "./PrivateRoutes";
const Pages = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
          <Route element={<PrivateRoutes />}>
              <Route path={`${process.env.PUBLIC_URL}`} element={<Layout />}>
                <Route element={<Invest/>} path="/" exact/>
                <Route element={<Invest/>} path="/overview" exact/>
                <Route element={<Analytics/>} path="/benchmark-analytics" exact/>
                <Route element={<PricingTable />} path="/peoplecount" exact/>
                <Route element={<TicketBenchMark />} path="/ticket-benchmark" exact/>
                <Route element={<SpecialTablePage/>} path="/All-device-status"/>
                <Route element={<FormValidation2 />} path="/device-pre-check"/>
                <Route element={<AppBenchMarkTicketSearch />} path="/zig-app-benchmark"/>
                <Route element={<FormValidation/>} path="/ticket-search"/>
                <Route element={<SearchByClient/>} path="/client-ticket-search"/>
                <Route element={<UserProfileActivity/>} path="/user-profile-activity"/>
                <Route element={<UserProfileSetting/>} path="/user-profile-setting"/>
              </Route>
            </Route>
            <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
              <Route element={<Login/>} path="/auth-login"/>
              <Route path="*" element={<Error404Modern />}></Route>
            </Route>
           
    </Routes>
  );
};
export default Pages;