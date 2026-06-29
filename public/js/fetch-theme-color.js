const fs = require("fs");
// read theme color from _data/site.json
console.log(fs);
fs.readFile("./data/theme.json", "utf8", function (err, dataFile) {
  if (err) {
    console.log(err);
    return;
  }

  // parse file to JSON so that the variables can be accessed
  dataFile = JSON.parse(dataFile);

  // TODO: Check if dataFile.primary_theme_color is set
  // Open variables.scss and search/replace "$theme: ..." with color from data file
  fs.readFile(
    "./assets/style/_variables.scss",
    "utf-8",
    function (err, scssFile) {
      if (err) {
        console.log(err);
        return;
      }

      var replaced = scssFile;

      // Change the variables to whatever was set in the data file
      const keyToCssVar = {
        primary_color: 'primary',
        // primary_foreground_color: 'primary-foreground',
        secondary_color: 'secondary',
        // secondary_foreground_color: 'secondary-foreground',
        anchor_color: 'anchor',
        // anchor_foreground_color: 'anchor-foreground',
        // background_color: 'background',
        // foreground_color: 'foreground',
        // surface_color: 'surface',
        // surface_foreground_color: 'surface-foreground',
        // text_primary_color: 'text-primary',
        // text_secondary_color: 'text-secondary',
        // text_muted_color: 'text-muted',
        // border_color: 'border',
        // border_strong_color: 'border-strong',
        // success_color: 'success',
        // warning_color: 'warning',
        // warning_foreground_color: 'warning-foreground',
        // danger_color: 'danger',
        // danger_foreground_color: 'danger-foreground',
      };

      Object.entries(keyToCssVar).forEach(([jsonKey, cssVarSuffix]) => {
        if (dataFile[jsonKey]) {
          const value = dataFile[jsonKey];
          const varName = `--color-${cssVarSuffix}`;
          const regex = new RegExp(`${varName}: .*`, 'g');
          replaced = replaced.replace(regex, `${varName}: ${value};`);
        }
      });

      // Write result back to variables.scss
      fs.writeFile(
        "./assets/style/_variables.scss",
        replaced,
        "utf-8",
        function (err) {
          console.log(replaced);
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );
});