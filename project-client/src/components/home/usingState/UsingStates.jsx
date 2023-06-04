import { useEffect } from "react";
import { getColors } from "../../services/colorService";
import { NavLink } from "react-router-dom";
import { useColorContext } from "../../context/ColorContext";
import { UseUsingStateContext } from "../../context/UsingStateContext";
import { getUsingStates } from "../../services/usingStateService";

function UsingStates() {
  const { usingStates, setUsingStates } = UseUsingStateContext();
  useEffect(() => {
    getUsingStates().then((result) => setUsingStates(result.data));
  }, []);
  return (
    <div>
      {usingStates.length !== 0 && (
        <div className="bg-white  rounded-lg flex flex-col shadow-item2 mt-10 dark:bg-gray-800 dark:text-white">
          <NavLink
            to="/main/products/"
            className="px-2  rounded py-2 border-b-2 font-bold dark:border-gray-600"
          >
            Tüm Kullanım Durumları
          </NavLink>
          {usingStates.map((usingState) => (
            <NavLink
              to={`/main/products/usingState/${usingState.usingStateId}`}
              className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
              key={usingState.usingStateId}
            >
              {usingState.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsingStates;
