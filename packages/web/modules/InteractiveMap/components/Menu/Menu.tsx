import * as React from "react";

import * as S from "./Menu.style";
import {
  IconStyleContext,
  IconSizeContext,
  SelectionContext
} from "../../InteractiveMap";
import { UserThemeContext } from "../../../../pages/_app";
import { LocateMeBtn } from "../LocateMeBtn/LocateMeBtn";

type Props = {
  onSaveLoaded: (d: any) => void;
  isOpen: boolean;
  showLogo: boolean;
};

export const Menu = (props: Props) => {
  const { onSaveLoaded, isOpen, showLogo } = props;
  const { setMode } = React.useContext(IconStyleContext);
  const { iconSize, setIconSize } = React.useContext(IconSizeContext);
  const { setTheme } = React.useContext(UserThemeContext);
  const { selection, setSelection } = React.useContext(SelectionContext);

  function handleIconSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIconSize(parseFloat(e.target.value));
  }

  function generateHandle(key: keyof typeof selection) {
    return {
      checked: selection[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSelection({
          ...selection,
          [key]: e.target.checked
        })
    };
  }

  return (
    <S.Root style={{ width: isOpen ? 360 : 0 }}>
      {showLogo !== false && (
        <S.LogoWrapper>
          <img src={require("./logo.png")} alt="Satisfactory map logo" />
        </S.LogoWrapper>
      )}
      <S.Content>
        <S.Section>
          <LocateMeBtn onSaveLoaded={onSaveLoaded} />
        </S.Section>
        <S.Section>
          <S.Title>Resource Nodes</S.Title>
          <S.SectionTitle>Purity</S.SectionTitle>
          <S.Purity>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("q_impure")} />
              <div>Impure</div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("q_normal")} />
              <div>Normal</div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("q_pure")} />
              <div>Pure</div>
            </S.ToggleBtn>
          </S.Purity>
          <S.SectionTitle>Types</S.SectionTitle>
          <S.Nodes>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_iron")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#CCCCCC",
                  borderColor: "#CCCCCC"
                }}
              >
                Iron
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_copper")} />
              <div
                style={{ backgroundColor: "#E65C2E", borderColor: "#E65C2E" }}
              >
                Copper
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_limestone")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#FFE7B3",
                  borderColor: "#FFE7B3"
                }}
              >
                Limestone
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_coal")} />
              <div style={{ backgroundColor: "#666", borderColor: "#666" }}>
                Coal
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_oil")} />
              <div
                style={{ backgroundColor: "#660000", borderColor: "#660000" }}
              >
                Oil
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_caterium")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#FFCC00",
                  borderColor: "#FFCC00"
                }}
              >
                Caterium
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_sulfur")} />
              <div
                style={{ backgroundColor: "#578000", borderColor: "#578000" }}
              >
                Sulfur
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_bauxite")} />
              <div
                style={{ backgroundColor: "#df896b", borderColor: "#df896b" }}
              >
                Bauxite
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_quartz")} />
              <div
                style={{ backgroundColor: "#FF6699", borderColor: "#FF6699" }}
              >
                Quartz
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_uranium")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#6FEA64",
                  borderColor: "#6FEA64"
                }}
              >
                Uranium
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_sam")} />
              <div
                style={{ backgroundColor: "#A424B3", borderColor: "#A424B3" }}
              >
                S.A.M
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("g_geysers")} />
              <div
                style={{ backgroundColor: "#00eaff", borderColor: "#00eaff" }}
              >
                Geysers
              </div>
            </S.ToggleBtn>
          </S.Nodes>
          {/* <S.SectionTitle>Options</S.SectionTitle> */}
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                checked={selection.n}
                className="custom-control-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let isChecked = e.target.checked;
                  setSelection({
                    ...selection,
                    n: isChecked,
                    g_geysers: isChecked,
                    n_bauxite: isChecked,
                    n_caterium: isChecked,
                    n_copper: isChecked,
                    n_coal: isChecked,
                    n_quartz: isChecked,
                    n_oil: isChecked,
                    n_limestone: isChecked,
                    n_iron: isChecked,
                    n_sam: isChecked,
                    n_sulfur: isChecked,
                    n_uranium: isChecked
                  })
                }}
                type="checkbox"
                id="customSwitchMiningNodes"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchMiningNodes"
              >
                {selection.n ? "Hide" : "Show"} nodes
              </label>
            </div>
          </S.SectionSelect>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                {...generateHandle("n_exploited")}
                className="custom-control-input"
                type="checkbox"
                id="customSwitchUsed"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchUsed"
              >
                {selection.n_exploited ? "Show" : "Hide"} mined
              </label>
            </div>
          </S.SectionSelect>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                {...generateHandle("n_blocked")}
                className="custom-control-input"
                type="checkbox"
                id="customSwitchBlocked"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchBlocked"
              >
                {selection.n_blocked ? "Show" : "Hide"} blocked
              </label>
            </div>
          </S.SectionSelect>
        </S.Section>
        {/* <S.Section>
          <S.SectionTitle>Geysers</S.SectionTitle>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                {...generateHandle("g_geysers")}
                className="custom-control-input"
                type="checkbox"
                id="customSwitchGeysers"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchGeysers"
              >
                {selection.g_geysers ? "Hide" : "Show"} geysers
              </label>
            </div>
          </S.SectionSelect>
        </S.Section> */}
        <S.Section>
          <S.Title>Drop-pods</S.Title>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                {...generateHandle("d_drops")}
                className="custom-control-input"
                type="checkbox"
                id="customSwitchDropPods"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchDropPods"
              >
                {selection.d_drops ? "Hide" : "Show"} pods
              </label>
            </div>
          </S.SectionSelect>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                {...generateHandle("d_collected")}
                className="custom-control-input"
                // disabled={onSaveLoaded ? true : false}
                type="checkbox"
                id="customSwitchDropPodsCollected"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchDropPodsCollected"
              >
                {selection.d_collected ? "Show" : "Hide"} collected
              </label>
            </div>
          </S.SectionSelect>
        </S.Section>
        <S.Section>
          <S.Title>Slugs</S.Title>
          <S.Slugs>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("s_green")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#0ad1d8",
                  borderColor: "#0ad1d8"
                }}
              >
                Green
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("s_yellow")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#f9f900",
                  borderColor: "#f9f900"
                }}
              >
                Yellow
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("s_purple")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#d100ed",
                  borderColor: "#d100ed"
                }}
              >
                Purple
              </div>
            </S.ToggleBtn>
          </S.Slugs>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let isChecked = e.target.checked;
                  setSelection({
                    ...selection,
                    s: isChecked,
                    s_green: isChecked,
                    s_yellow: isChecked,
                    s_purple: isChecked
                  })}}
                className="custom-control-input"
                type="checkbox"
                id="customSwitchSlugs"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchSlugs"
              >
                {selection.s ? "Hide" : "Show"} slugs
              </label>
            </div>
          </S.SectionSelect>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let isChecked = e.target.checked;
                  setSelection({
                    ...selection,
                    s_blocked: isChecked
                  })}}
                className="custom-control-input"
                type="checkbox"
                id="customSwitchSlugsBlocked"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchSlugsBlocked"
              >
                {selection.s_collected ? "Show" : "Hide"} blocked
              </label>
            </div>
          </S.SectionSelect>
          <S.SectionSelect>
            <div className="custom-control custom-switch">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let isChecked = e.target.checked;
                  setSelection({
                    ...selection,
                    s_collected: isChecked
                  })}}
                className="custom-control-input"
                type="checkbox"
                id="customSwitchSlugsCollected"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitchSlugsCollected"
              >
                {selection.s_collected ? "Show" : "Hide"} collected
              </label>
            </div>
          </S.SectionSelect>
        </S.Section>
        <S.Title>Artifacts</S.Title>
        <S.Section>
          <S.SectionSelect>
            <button
              onClick={() =>
                setSelection({ ...selection, a_mercer: true, a_somer: true })
              }
            >
              All
            </button>
            <button
              onClick={() =>
                setSelection({ ...selection, a_mercer: false, a_somer: false })
              }
            >
              None
            </button>
          </S.SectionSelect>
        </S.Section>
        <S.Section>
          {/* <label>
            <input type="checkbox" {...generateHandle("a_collected")} />
            Hide collected
          </label> */}
          <S.ToggleBtn>
            <input type="checkbox" {...generateHandle("a_blocked")} />
            <div>{selection.a_blocked ? "Show" : "Hide"} blocked ones</div>
          </S.ToggleBtn>
          <S.Artifacts>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("a_somer")} />
              <div
                style={{
                  backgroundColor: "#410f2b",
                  borderColor: "#410f2b"
                }}
              >
                Somersloop
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("a_mercer")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#9fb8b5",
                  borderColor: "#9fb8b5"
                }}
              >
                Mercer
              </div>
            </S.ToggleBtn>
          </S.Artifacts>
        </S.Section>
        <S.Title>Options</S.Title>
        <S.Section>
          <div style={{ display: "flex", alignItems: "center" }}>
            Theme:
            <button onClick={() => setTheme("light")}>light</button>
            <button onClick={() => setTheme("dark")}>dark</button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            Mode:
            <button onClick={() => setMode("default")}>default</button>
            <button onClick={() => setMode("colorblind")}>colorblind</button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            Icon size:
            <input
              type="range"
              value={`${iconSize}`}
              onChange={handleIconSizeChange}
              step="0.1"
              min="0.5"
              max="2"
            />
          </div>
        </S.Section>
      </S.Content>
      <S.GH
        href="https://github.com/LancelotP/satisfactory-map"
        target="__blank"
      >
        Source code available on GitHub
      </S.GH>
    </S.Root>
  );
};
