import React, { Fragment, useCallback, useEffect, useState } from "react";
import navigation from "../../../../menu-items";
import Route from "../../../../Constants/browserRoutes";
import { Link } from "react-router-dom";

const BreadCrumb = () => {
  // const [main, setMain] = useState([]);
  const [item, setItem] = useState({});
  const [subItem, setSubItem] = useState({});
  const [subItemChild, setSubItemChild] = useState({});

  const getCollapse = useCallback((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        //currently first one is useless
        if (child.type && child.type === "collapse") {
          getCollapse(child);
        } else if (child.type && child.type === "item") {
          if (document.location.pathname === child.url) {
            // setMain(item);
            setItem(child);
            setSubItem({});
            setSubItemChild({});
          } else if (child.subItems) {
            child.subItems.forEach((subItem) => {
              if (subItem.type && subItem.type === "subItem") {
                let pathname = document.location.pathname;
                //////////////////////////
                let pathnameLength = pathname.split("/").length;
                let lastPathnameIndex = pathname.split("/")[pathnameLength - 1];

                //check if last params index is a number (id) or not.
                if (isNaN(lastPathnameIndex)) {
                  pathname = document.location.pathname;
                } else {
                  if (subItem && subItem.url && subItem.url.split(":")) {
                    //Geting just those URLs where params (e.g; id) exists & Pathname and URL of subItem matches without its last index (i.e; number(e.g;2) and :id respectively)
                    let subItemParamName = subItem.url.split(":")[1];
                    if (
                      subItemParamName &&
                      pathname
                        .split("/")
                        .reverse()
                        .slice(1)
                        .reverse()
                        .join("/") ===
                        subItem.url
                          .split("/")
                          .reverse()
                          .slice(1)
                          .reverse()
                          .join("/")
                    ) {
                      setItem(child);
                      setSubItem(subItem);
                      setSubItemChild({});
                    }
                  }
                }
                ///////////////////////////////
                if (pathname === subItem.url) {
                  // setMain(item);
                  setItem(child);
                  setSubItem(subItem);
                  setSubItemChild({});
                } else if (subItem.subItemsChildren) {
                  subItem.subItemsChildren.forEach((node) => {
                    if (node.type && node.type === "subItemChild") {
                      if (document.location.pathname === node.url) {
                        setItem(child);
                        setSubItem(subItem);
                        setSubItemChild(node);
                      }
                    }
                  });
                }
              }
            });
          }
        }
        return false;
      });
    }
  }, []);

  useEffect(() => {
    navigation.items &&
      navigation.items.forEach((item, index) => {
        if (item.type && item.type === "group") {
          getCollapse(item, index);
        }
        return false;
      });
  }, [getCollapse, window.location.pathname]);

  let title =
    Object.keys(subItemChild).length !== 0
      ? `${subItemChild.title} | Dinisium`
      : Object.keys(subItem).length !== 0
      ? `${subItem.title} | Dinisium`
      : Object.keys(item).length !== 0 && `${item.title} | Dinisium`;

  document.title = title;

  return (
    <ol className="breadcrumb mt-4 mb-4">
      {item.breadcrumbs && (
        <Fragment>
          {Object.keys(subItem).length === 0 &&
            Object.keys(subItemChild).length === 0 && (
              <>
                <li className="breadcrumb-item active">
                  <Link to={Route.DASHBOARD}>
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
                <li className="breadcrumb-item active">{item.title}</li>
              </>
            )}

          {subItem.breadcrumbs && Object.keys(subItemChild).length === 0 && (
            <>
              <li className="breadcrumb-item active">
                <Link to={Route.DASHBOARD}>
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={item.url}>{item.title}</Link>
              </li>
              <li className="breadcrumb-item active">{subItem.title}</li>
            </>
          )}
          {subItem.breadcrumbs && subItemChild.breadcrumbs && (
            <>
              <li className="breadcrumb-item active">
                <Link to={Route.DASHBOARD}>
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={item.url}>{item.title}</Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={subItem.url}>{subItem.title}</Link>
              </li>
              <li className="breadcrumb-item active">{subItemChild.title}</li>
            </>
          )}
        </Fragment>
      )}
    </ol>
  );
};

export default BreadCrumb;
