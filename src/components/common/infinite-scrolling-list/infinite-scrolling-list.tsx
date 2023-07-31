"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./infinite-scrolling-list.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/common/loader";
import { useErrorBoundary } from "react-error-boundary";
import ErrorBoundaryComponent from "../error-boundary-component";

type InfiniteScrollingListProps = {
  children: Function;
  scrollingParent?: HTMLElement;
  dataFetcher: (page: number) => Promise<any>;
};

const InfiniteScrollingList = ({
  children,
  scrollingParent,
  dataFetcher,
}: InfiniteScrollingListProps) => {
  const { showBoundary } = useErrorBoundary();
  const wrapper = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const data = await dataFetcher(page);
      setPage((page) => page + 1);
      setItems((items) => items.concat(data));
      if (!data.length || data.length < 20) setHasMore(false);
    } catch (err) {
      showBoundary(err);
      throw err;
    }
  }, [page, setItems, dataFetcher, showBoundary]);

  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  //fetchData until there is enough to cause parent element to scroll
  useEffect(() => {
    if (!wrapper.current) return;
    if (!hasMore) {
      setInitiallyLoaded(true);
      return;
    }
    let scrollParent =
      scrollingParent ||
      (document.scrollingElement as HTMLElement) ||
      (document.documentElement as HTMLElement);
    if (scrollParent.scrollHeight === scrollParent.clientHeight) {
      fetchData();
    } else {
      setInitiallyLoaded(true);
    }
  }, [hasMore, wrapper, scrollingParent, items, fetchData]);

  return (
    <div ref={wrapper} className={styles.infiniteScrollingWrapper}>
      <InfiniteScroll
        className={styles.infiniteScrollingList}
        dataLength={items.length}
        next={fetchData}
        hasMore={initiallyLoaded && hasMore}
        loader={<Loader />}
      >
        {items.map((item, index) => children(item, index))}
        {!initiallyLoaded && <Loader />}
      </InfiniteScroll>
    </div>
  );
};

export default ErrorBoundaryComponent(InfiniteScrollingList);
