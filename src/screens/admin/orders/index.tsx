import { Icon, Typography } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrder } from "../../../@types/orders.types";
import { IColumn } from "../../../@types/table.types";
import Table from "../../../components/Table";
import { AppState } from "../../../redux/store";
import { fetchAllOrders, notify } from "../../../utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "../../../components/ReviewsCard/ReviewForm";
import { Row } from "../../../components/GlobalStyles";
import { Button } from "../../../components/Button/Button.style";
import { deliverOrder } from "../../../redux/actions/orders.actions";

const columns: IColumn[] = [
  {
    name: "orderItems",
    cellRenderer: (params) => `${params.value?.length} Items`,
  },
  {
    name: "paymentMethod",
  },
  {
    name: "totalPrice",
    cellRenderer: (params) => `$${params.value?.toFixed(2)}`,
  },
  {
    name: "isPaid",
  },
  {
    name: "isDelivered",
  },
  { name: "Actions", cellRenderer: "ActionsRenderer" },
];

const Actions = (params: ICellRendererParams) => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const markAsDelivered = useCallback(() => {
    dispatch(
      deliverOrder(params.data._id, () => {
        notify("success", "Order delivered successfully");
        handleClose();
      })
    );
  }, [params, dispatch]);

  const handleClose = () => setVisible(false);

  return (
    <>
      {params.data.isDelivered ? (
        <></>
      ) : (
        <div onClick={() => setVisible(true)}>
          <Icon
            sx={{
              cursor: "pointer",
              background: "#fff",
              borderRadius: "6px",
            }}
          >
            <EditIcon sx={{ color: "#000", marginBottom: "5px" }} />
          </Icon>
        </div>
      )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="product-delete-dialog"
        open={visible}
      >
        <BootstrapDialogTitle id="product-delete-dialog" onClose={handleClose}>
          <Typography
            variant="h6"
            color="#FC4059"
            sx={{ marginBottom: "2em", textAlign: "center" }}
          >
            Are you sure you want to mark this order as delivered ?
          </Typography>
          <Row wrap gap="100px">
            <Button onClick={markAsDelivered}>Yes</Button>
            <Button
              border={"1px solid #fcdd06"}
              background="none"
              onClick={handleClose}
            >
              No
            </Button>
          </Row>
        </BootstrapDialogTitle>
      </BootstrapDialog>
    </>
  );
};

export default function AllOrdersProduct() {
  const {
    orders: { pages },
  } = useSelector((state: AppState) => state.orders);

  const [orders, setOrders] = useState<IOrder[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setOrders(await fetchAllOrders(pages || 10));
    })();
    // dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div style={{ width: "60%", margin: "auto" }}>
      <Typography
        color="text.primary"
        variant="h2"
        fontSize="1.5rem"
        sx={{
          marginBlock: "30px",

          letterSpacing: "0.6px",
        }}
      >
        ALL ORDERS
      </Typography>
      <Table
        data={orders}
        columns={columns}
        frameworkComponents={{
          ActionsRenderer: Actions,
        }}
      />
    </div>
  );
}
