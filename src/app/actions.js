import plux from './plux';

const actions = {
  'loadconfig': plux.createAction("loadconfig"),
  'configloaded': plux.createAction("configloaded"),
  'toggleoption': plux.createAction("toggleoption"),
  'clearoptions': plux.createAction("clearoptions"),
  'loaddetails': plux.createAction("loaddetails"),
  'detailsloaded': plux.createAction("detailsloaded"),
  'cleardetails': plux.createAction("cleardetails"),
};

export default actions;
