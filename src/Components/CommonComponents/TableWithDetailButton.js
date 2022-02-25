import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaterialTable from "material-table";
import { Route, useHistory } from "react-router";
import { Link } from "react-router-dom";

function TableWithDetailButton({
  columns,
  data,
  RouteBtn,
  toSubscriptionParticipate,
  isViewDetailBtn,
  isViewIconBtn,
  RouteForIconBtn,
  viewDetailButtonName,
  title,
}) {
  const history = useHistory();
  const myTitle = title;
  return (
    <div className="table-responsive">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h6 style={{ marginLeft: "1rem" }}>{myTitle}</h6>
        </AccordionSummary>
        <AccordionDetails>
          <MaterialTable
            title={title}
            columns={columns}
            data={data}
            // Section for View Detail button

            actions={[
              {
                ...(isViewDetailBtn && {
                  icon: "",
                  tooltip: "View Details",
                  onClick: (e, data) => {
                    e.preventDefault();
                    history.push({
                      pathname: `${RouteBtn}${data?.id}`,
                      ...(toSubscriptionParticipate && { state: data || {} }),
                    });
                  },
                }),
              },
              {
                ...(isViewIconBtn && {
                  icon: "Explore",
                  tooltip: "Explore more",
                  isFreeAction: true,
                }),
              },
            ]}
            components={{
              Action: (props) => {
                return (
                  <>
                    {props.action.icon === "Explore" && (
                      <Link
                        style={{
                          margin: "20px",
                          textDecoration: "underline",
                          fontSize: "15px",
                        }}
                        to={RouteForIconBtn}
                      >
                        <b>Explore More</b>
                      </Link>
                    )}
                    {props.action.icon === "" && (
                      <button
                        onClick={(event) =>
                          props.action.onClick(event, props.data)
                        }
                        className="dls-btn bg-semi-black text-white width-max-content"
                      >
                        {viewDetailButtonName}
                      </button>
                    )}
                  </>
                );
              },
            }}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#0394FD",
                color: "#FFF",
              },
            }}
            localization={{
              header: {
                actions: "",
              },
            }}
            // Section for Explore More Link
            // {...(isViewIconlBtn && {
            //   actions: [
            //     {
            //       icon: { actionIcon },
            //       tooltip: "Explore more",
            //       isFreeAction: true,
            //     },
            //   ],
            //   components: {
            //     Action: (props) => (
            //       <Link
            //         style={{
            //           margin: "20px",
            //           textDecoration: "underline",
            //           fontSize: "15px",
            //         }}
            //         to={RouteForIconBtn}
            //       >
            //         <b>Explore More</b>
            //       </Link>
            //     ),
            //   },
            // })}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TableWithDetailButton;
