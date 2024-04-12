import BuildMigration from "./class/BuildMigration.js";
import BuildName from "./class/BuildName.js";
import "./components/InstallationNavigation.js";
import "./components/ElementEditor.js";
import { installationDispatcher } from "./helpers/start.js";

fetch("../data/data.json").then(function (response) {
  response.json().then((installation) => {
    new BuildMigration(installation.schema).build();
    new BuildName(installation.schema).build();

    installationDispatcher.setState(installation);
  });
});
