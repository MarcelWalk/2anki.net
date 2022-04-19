import ReactDOMServer from "react-dom/server";

import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import useMetadata from "./hooks/useMetadata";

const BlockBookmark = async (
  block: GetBlockResponse
): Promise<string | null> => {
  /* @ts-ignore */
  const bookmark = block.bookmark;
  const metadata = await useMetadata(bookmark.url);

  return ReactDOMServer.renderToStaticMarkup(
    <a style={{margin: "4px"}} href={bookmark.url} className="bookmark source">
      <div className="bookmark-info">
        <div className="bookmark-text">
          {metadata.title && <div className="bookmark-title">{metadata.title}</div>}
          {metadata.description && <div className="bookmark-description">{metadata.description}</div>}
        </div>
        <div className="bookmark-href">
          {metadata.logo && <img src={metadata.logo} className="icon bookmark-icon" />}
          {bookmark.url}
        </div>
      </div>
      {metadata.image && <img src={metadata.image} className="bookmark-image" />}
    </a>
  );
};

export default BlockBookmark;
