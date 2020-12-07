import React, { memo, ReactNode } from "react";
import {
  AlignItemsTypes,
  FlexDirectionTypes,
  FlexTypes,
  JustifyContentTypes
} from "./types";

interface FlexContainerInterface {
  children: ReactNode;
  flexType?: FlexTypes;
  jc?: JustifyContentTypes;
  ai?: AlignItemsTypes;
  flexDirection?: FlexDirectionTypes;
  className?: string;
}

const FlexContainer = ({
  ai,
  jc = JustifyContentTypes.START,
  flexDirection = FlexDirectionTypes.ROW,
  flexType = FlexTypes.FLEX,
  className,
  children
}: FlexContainerInterface) => {
  return (
    <div
      style={{
        display: flexType,
        justifyContent: jc,
        alignItems: ai,
        flexDirection
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default memo(FlexContainer);
