declare module "*.svg" {
    import * as React from "react";

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    const src: string;
    export default src;
}

declare module "*.svg?react" {
    import * as React from "react";
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
}

declare module "*.png" {
    const png: string;
    export default png;
}

declare module "*.gif" {
    const gif: string;
    export default gif;
}
