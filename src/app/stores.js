import plux from './plux';
import actions from './actions';

const stores = () => {
  plux.createStore("shared", (action, data, state) => {
    let updateChoices = () => {
      const selectedOptions = state.options.filter((option) => option.active).map((option) => option.name);
      state.choices.forEach((choice) => {
        let intersection = choice.options.filter(x => selectedOptions.indexOf(x) > -1);
        choice.available = intersection.length == selectedOptions.length;
      });
    };
    switch(action){
      case "loadconfig":
        console.log("loading configuration");
        console.log(state);
        let p1 = fetch('/choices.json');
        let p2 = fetch('/options.json');
        Promise.all([p1, p2]).then((values) => {
          const p1 = values[0].json();
          const p2 = values[1].json();
          Promise.all([p1, p2]).then((objs) => {
            actions.configloaded([ objs[0], objs[1] ]);
          });
        });
        break;
      case "configloaded":
        state.choices = data[0].map((choice) => (Object.assign(choice, { 'available': true })));
        state.options = data[1].map((option) => ({ 'name': option, 'active': false }));
        state.dataloaded = true;
        break;
      case "toggleoption":
        const index = state.options.findIndex((option) => option.name === data);
        state.options[index].active = !state.options[index].active;
        updateChoices();
        break;
      case "clearoptions":
        state.options.forEach((option) => option.active = false);
        updateChoices();
        break;
    }
  }, {
    'dataloaded': false,
    'options': [],
    'choices': [],
    'selected': [],
    'details': {},
    'detailsloaded': false,
  });
};

export default stores;
