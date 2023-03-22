import MainDashBoard from "../components/Admin/MainDashBoard";
import MainSideBar from "../components/Admin/MainSideBar";
import MainProduct from "../components/Admin/MainProduct";
import MainCatalog from "../components/Admin/MainCatalog";
import MainUser from "../components/Admin/MainUser";
import MainRate from "../components/Admin/MainRate";
import MainEmployee from "../components/Admin/MainEmployee";
import MainStatistic from "../components/Admin/MainStatistic";
import MainBill from "../components/Admin/MainBill";
import { AiOutlineShoppingCart, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiShoppingBag, FiUsers } from "react-icons/fi";
import { FcStatistics } from "react-icons/fc";
import { MdOutlineRateReview } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiBillLine } from "react-icons/ri";
const sideBarList = [
  {
    key: 1,

    text: "DASHBOARD",
    list: [
      {
        key: 1,
        link: "dashboard",
        icon: <FiShoppingBag />,
        text: "Trang chủ",
      },
    ],
  },
  {
    key: 2,
    text: "TRANG QUẢN LÝ",
    list: [
      {
        key: 1,
        link: "quan-ly-danh-muc",
        icon: <BiCategoryAlt />,
        text: "Quản lý danh mục",
      },
      {
        key: 2,
        link: "quan-ly-san-pham",
        icon: <AiOutlineShoppingCart />,
        text: "Quản lý sản phẩm",
      },
      {
        key: 3,
        link: "quan-ly-don-hang",
        icon: <RiBillLine />,
        text: "Quản lý đơn hàng",
      },
      {
        key: 4,
        link: "quan-ly-nguoi-dung",
        icon: <AiOutlineUsergroupAdd />,
        text: "Quản lý tài khoản",
      },
      {
        key: 5,
        link: "quan-ly-danh-gia",
        icon: <MdOutlineRateReview />,
        text: "Quản lý đánh giá",
      },
      {
        key: 6,
        link: "quan-ly-nhan-vien",
        icon: <HiOutlineUserGroup />,
        text: "Quản lý nhân viên",
      },
      {
        key: 7,
        link: "quan-ly-thong-ke",
        icon: <FcStatistics />,
        text: "Quản lý thống kê",
      },
    ],
  },
];

const billListData = [
  {
    image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    name: "Cà chua",
    customer_name: "Minh",
    bill_price: "350000",
    bill_status: "pending",
  },
  {
    image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    name: "Cà chua",
    customer_name: "Minh",
    bill_price: "350000",
    bill_status: "Thành công",
  },
];

const productListData = [
  {
    product_id: 1,
    product_image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    product_name: "Cà chua",
    product_catalog: "Trà",
    product_price: "350000",
  },
  {
    product_id: 2,
    product_image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    product_name: "Pháo",
    product_catalog: "Trà",
    product_price: "350000",
  },
];

const catalogListData = [
  {
    catalog_id: 1,
    catalog_name: "Trà",
  },
  {
    catalog_id: 2,
    catalog_name: "Coffe",
  },
];

const employeeListData = [
  {
    employee_id: 1,
    employee_image:
      "https://shoppymultidash.netlify.app/static/media/avatar.ad026443bbabdf64ce71.jpg",
    employee_name: "Tân",
    employee_age: "29",
    employee_hometown: "Vĩnh Long",
    employee_position: "Shipper",
    employee_salary: "3900000",
  },
  {
    employee_id: 2,
    employee_image:
      "https://shoppymultidash.netlify.app/static/media/avatar.ad026443bbabdf64ce71.jpg",
    employee_name: "Minh",
    employee_age: "18",
    employee_hometown: "Vĩnh Long",
    employee_position: "Nhân viên phục vụ",
    employee_salary: "3900000",
  },
];

const userListData = [
  {
    user_id: 1,
    user_image:
      "https://shoppymultidash.netlify.app/static/media/avatar.ad026443bbabdf64ce71.jpg",
    user_fullname: "Đào Trí Minh Tân",
    user_name: "bytes123",
    user_password: "aaaaa",
    user_address: "Vĩnh Long",
    user_isAdmin: 1,
    user_created_date: "27/09/2022",
  },
];

const commomBoxList = [
  {
    key: 1,
    icon: <FiUsers />,
    bg: "bg-sky-200",
    text: "Khách hàng",
  },
  {
    key: 2,
    icon: <AiOutlineShoppingCart />,
    bg: "bg-amber-300",
    text: "Sản phẩm",
  },
  {
    key: 3,
    icon: <BsBoxSeam />,
    bg: "bg-red-200",
    text: "Hàng bán ra",
  },
  {
    key: 4,
    icon: <FcMoneyTransfer />,
    bg: "bg-green-200",
    text: "Lợi nhuận",
  },
];

const rateListData = [
  {
    rate_id: 1,
    rate_content: "Quá đã",
    rate_user: "bytes123",
    rate_star: 5,
    rate_created_date: "27/09/2022",
  },
];

const rateTemplateData = {
  row_index: "",
  rate_id: "",
  rate_content: "",
  rate_user: "",
  rate_star: "",
  rate_created_date: "",
};

const catalogTemplateData = {
  catalog_name: "",
};

const employeeTemplateData = {
  employee_image: "",
  employee_name: "",
  employee_age: "",
  employee_hometown: "",
  employee_position: "",
  employee_salary: "",
};

const employeeDataCheck = [
  " employee_image",
  " employee_name",
  " employee_age",
  " employee_hometown",
  " employee_position",
  " employee_salary",
];

const productTemplateData = {
  product_id: "",
  product_image: "",
  product_name: "",
  product_catalog: "",
  product_price: "",
};

const userTemplateData = {
  user_id: "",
  user_image: "",
  user_fullname: "",
  user_name: "",
  user_password: "",
  user_address: "",
  user_isAdmin: "",
  user_created_date: "",
};

const catalogDataCheck = ["catalog_name"];

const productDataCheck = [
  "product_image",
  "product_name",
  "product_catalog",
  "product_price",
];

const userDataCheck = [
  "user_image",
  "user_fullname",
  "user_name",
  "user_email",
  "user_password",
  "user_address",
  "user_isAdmin",
  "user_created_date",
];

export {
  MainDashBoard,
  MainSideBar,
  MainProduct,
  MainCatalog,
  MainRate,
  MainUser,
  MainEmployee,
  MainBill,
  MainStatistic,
  commomBoxList,
  sideBarList,
  billListData,
  productListData,
  catalogListData,
  employeeListData,
  rateListData,
  userListData,
  rateTemplateData,
  catalogDataCheck,
  catalogTemplateData,
  employeeTemplateData,
  employeeDataCheck,
  productTemplateData,
  productDataCheck,
  userDataCheck,
  userTemplateData,
};
