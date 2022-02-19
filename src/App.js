import GlobalStyle from "./style/GlobalStyle";
import MainPage from "layout/MainPage";
import MOCK_DATA from "assets/MOCK_DATA.json";
import ItemsPage from "components/ItemSheet";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tableActions } from "store/tableSlice";

import SelectView from "components/SelectView";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tableActions.getTableData(MOCK_DATA));
  }, []);

  return (
    <MainPage>
      <GlobalStyle />
      {/* <Cards /> */}
      <ItemsPage />
      <SelectView />
    </MainPage>
  );
};

export default App;
