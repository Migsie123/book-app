import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./infinite-scrolling-list.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/common/loader";

type InfiniteScrollingListProps = {
  children: Function;
  scrollingParent?: HTMLElement;
  dataFetcher: Function;
};

export default function InfiniteScrollingList({
  children,
  scrollingParent,
  dataFetcher,
}: InfiniteScrollingListProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await dataFetcher();
    if (!data) return;
    setItems((items) => items.concat(data));
  }, [setItems, dataFetcher]);

  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  useEffect(() => {
    if (!wrapper.current) return;
    let scrollParent =
      scrollingParent ||
      (document.scrollingElement as HTMLElement) ||
      (document.documentElement as HTMLElement);
    if (scrollParent.scrollHeight === scrollParent.clientHeight) {
      fetchData();
    } else {
      setInitiallyLoaded(true);
    }
  }, [wrapper, scrollingParent, items, fetchData]);

  return (
    <div ref={wrapper} className={styles.infiniteScrollingWrapper}>
      <InfiniteScroll
        className={styles.infiniteScrollingList}
        dataLength={items.length}
        next={fetchData}
        hasMore={initiallyLoaded}
        loader={<Loader />}
      >
        {items.map((item, index) => children(item, index))}
        {!initiallyLoaded && <Loader />}
      </InfiniteScroll>
    </div>
  );
}
