import { Fragment } from "react";

const DestructureJSON = ({
  jsonObj,
  finalRendererFn,
  headerClasses,
  containerClasses,
  itemContainerClasses,
  itemClasses,
  treeLvl = 0,
  maxTreeLvl = 4,
  getItemProps,
  handleHeaderClick,
}) => {
  if (treeLvl >= maxTreeLvl) {
    return "Max Depth Exceeded";
  }
  return (
    <div className={`${containerClasses}`}>
      {Object.entries(jsonObj)?.map(([header, items], index) => {
        if (Array.isArray(items)) {
          return (
            <Fragment key={`items-${treeLvl}-${index}`}>
              <h4
                className={"cursor-pointer " + headerClasses}
                onClick={handleHeaderClick.bind(null, items)}
              >
                {header}
              </h4>
              <div className={itemContainerClasses}>
                {items?.map((item, itemIndex) => {
                  return (
                    <div
                      key={`items-${treeLvl}-${index}-item-${itemIndex}`}
                      className={itemClasses}
                      {...getItemProps(item)}
                    >
                      {finalRendererFn(item)}
                    </div>
                  );
                })}
              </div>
            </Fragment>
          );
        } else if (typeof items === "object") {
          return (
            <>
              <h4 className={"opacity-50 " + headerClasses}>{header}</h4>
              <div className="px-8">
                <DestructureJSON
                  jsonObj={items}
                  treeLvl={treeLvl + 1}
                  finalRendererFn={finalRendererFn}
                  maxTreeLvl={maxTreeLvl}
                  itemClasses={itemClasses}
                  containerClasses={containerClasses}
                  headerClasses={headerClasses}
                  itemContainerClasses={itemContainerClasses}
                  getItemProps={getItemProps}
                  handleHeaderClick={handleHeaderClick}
                />
              </div>
            </>
          );
        } else {
          return <></>;
        }
      })}
    </div>
  );
};
export default DestructureJSON;
