import React, { useState, useEffect } from "react";
import Head from "next/head";

import * as S from "./InteractiveMap.style";
import { Menu } from "./components/Menu/Menu";
import dynamic from "next/dynamic";
import { nodes } from "./data/nodes";
import { yellowSlugs } from "./data/s_yellow";
import { greenSlugs } from "./data/s_green";
import { purpleSlugs } from "./data/s_purple";
import {
  getDefaultSelection,
  MarkerSelection
} from "./utils/getDefaultSelection";
import { getMarkerSelectionHash } from "./utils/markerSelectionToHash";
import { PlayerLocation } from "./components/LocateMeBtn/getPlayerFromSave";
import { dropPods } from "./data/d_droppods";
import { somers } from "./data/a_somer";
import { mercers } from "./data/a_mercer";

const NOSSRMap = dynamic(
  // @ts-ignore
  () => import("./components/Map/Map").then(c => c.Map),
  {
    ssr: false
  }
);

export const IconStyleContext = React.createContext<{
  mode: "default" | "colorblind";
  setMode: (m: "default" | "colorblind") => void;
}>({
  mode: "default",
  setMode: () => null
});

export const IconSizeContext = React.createContext<{
  iconSize: number;
  setIconSize: (s: number) => void;
}>({
  iconSize: 1,
  setIconSize: () => null
});

const defaultSelection = {
  q_impure: true,
  q_normal: true,
  q_pure: true,
  n: false,
  n_iron: false,
  n_copper: false,
  n_limestone: false,
  n_coal: false,
  n_oil: false,
  n_caterium: false,
  n_sulfur: false,
  n_bauxite: false,
  n_quartz: false,
  n_uranium: false,
  n_sam: false,
  n_blocked: false,
  n_exploited: false,
  s: false,
  s_blocked: false,
  s_collected: false,
  s_green: false,
  s_purple: false,
  s_yellow: false,
  d_drops: false,
  d_collected: false,
  g_geysers: false,
  g_exploited: false,
  a_blocked: false,
  a_collected: false,
  a_mercer: false,
  a_somer: false
};

type Selection = typeof defaultSelection;

export const SelectionContext = React.createContext<{
  selection: Selection;
  setSelection: (s: Selection) => void;
}>({
  selection: defaultSelection,
  setSelection: () => null
});

type Props = {
  embed?: boolean;
};

export const InteractiveMap = (props: Props) => {
  const [mode, setMode] = useState<"default" | "colorblind">("default");
  const [iconSize, setIconSize] = useState(1);
  const [selection, setSelection] = useState<Selection>(getDefaultSelection());
  const [players, setPlayers] = useState<PlayerLocation[]>([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [pNodes, setPNodes] = useState(nodes.filter(e => e.type !== 'unknown' && e.purity !== 'unknown'));
  const [pDropPods, setPDropPods] = useState(dropPods);
  const [pGreenSlugs, setPGreenSlugs] = useState(greenSlugs);
  const [pYellowSlugs, setPYellowSlugs] = useState(yellowSlugs);
  const [pPurpleSlugs, setPPurpleSlugs] = useState(purpleSlugs);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      const storedMode = localStorage.getItem("view_mode");

      if (storedMode === "colorblind") {
        setMode("colorblind");
      }
    }
  }, []);

  const handleChangeMode = (mode: "default" | "colorblind") => {
    setMode(mode);

    if (typeof localStorage !== undefined) {
      localStorage.setItem("view_mode", mode);
    }
  };

  useEffect(() => {
    if (typeof location !== "undefined" && location.hash) {
      // @ts-ignore
      const [lat, lng, zoom, filter] = location.hash
        .slice(1)
        .split(";")
        .map(e => parseFloat(e))
        .filter(e => e && !isNaN(e));

      if (filter) {
        setSelection(getDefaultSelection(filter));
      }
    }
  }, []);

  function handleSelectionChange(s: MarkerSelection) {
    const [lat, lng, zoom] = location.hash
      .slice(1)
      .split(";")
      .map(e => parseFloat(e));

    const location_hash = `${lat};${lng};${zoom};${getMarkerSelectionHash(s)}`;
    if (history && typeof history.replaceState === "function") {
      history.replaceState("", "", "#" + location_hash);
    } else {
      location.hash = location_hash;
    }
    setSelection(s);
  }

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  function handleSaveLoaded(d: any) {
    setPlayers(d.players);

    const minersTargets: string[] = d.miners.map((t: any) => t.targetID);
    const collectedDropPods: string[] = d.collected.filter((f: any) => f.type ==='DROP_POD').map((d: any) => d.id);
    const collectedGreenSlugs: string[] = d.collected.filter((f: any) => f.type ==='SLUG_GREEN').map((d: any) => d.id);
    const collectedYellowSlugs: string[] = d.collected.filter((f: any) => f.type ==='SLUG_YELLOW').map((d: any) => d.id);
    const collectedPurpleSlugs: string[] = d.collected.filter((f: any) => f.type ==='SLUG_PURPLE').map((d: any) => d.id);
    
    setPNodes(nodes.map(node => ({
      ...node,
      exploited: minersTargets.indexOf(node.originId) !== -1
    })));

    setPDropPods(dropPods.map(node => ({
      ...node,
      collected: collectedDropPods.indexOf(node.originId) !== -1
    })));

    setPGreenSlugs(greenSlugs.map(node => ({
      ...node,
      collected: collectedGreenSlugs.indexOf(node.originId) !== -1
    })));

    setPYellowSlugs(yellowSlugs.map(node => ({
      ...node,
      collected: collectedYellowSlugs.indexOf(node.originId) !== -1
    })));

    setPPurpleSlugs(purpleSlugs.map(node => ({
      ...node,
      collected: collectedPurpleSlugs.indexOf(node.originId) !== -1
    })));

  }
  return (
    <S.Root>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossOrigin="anonymous"
        />
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossOrigin="anonymous"
        />
      </Head>
      <IconStyleContext.Provider value={{ mode, setMode: handleChangeMode }}>
        <IconSizeContext.Provider value={{ iconSize, setIconSize }}>
          <SelectionContext.Provider
            value={{ selection, setSelection: handleSelectionChange }}
          >
            <React.Fragment>
              <Menu
                showLogo={props.embed === true ? false : true}
                isOpen={isMenuOpen}
                onSaveLoaded={handleSaveLoaded}
              />
              <NOSSRMap
                toggleMenu={toggleMenu}
                isMenuOpen={isMenuOpen}
                players={players}
                markers={pNodes}
                somers={somers}
                mercers={mercers}
                dropPods={pDropPods}
                greenSlugs={pGreenSlugs}
                yellowSlugs={pYellowSlugs}
                purpleSlugs={pPurpleSlugs}
              />
            </React.Fragment>
          </SelectionContext.Provider>
        </IconSizeContext.Provider>
      </IconStyleContext.Provider>
    </S.Root>
  );
};
