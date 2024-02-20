# Pocket Billiards Score Keeper Overlay

## Introduction

Pocket Billiards Score Keeper Overlay; designed to enhance your streaming experience when broadcasting billiards matches. This overlay provides a streamlined, easy-to-use interface for scoring, allowing you to focus on the game while keeping your audience engaged.

Having an easy-to-use and easy-to-install control panel is essential for streamers. It simplifies the process of managing the overlay during a live stream, enabling you to update scores, display player names, and track game progress with just a few clicks. This simplicity not only enhances the viewer experience but also reduces the likelihood of errors, ensuring that your stream remains professional and engaging.

## Features

- Easy to use control panel.
- Built-in country flag generator.
- Scoring options for 8-Ball, 9-Ball, 10-Ball, Straight Pool, and One Pocket.
- One click updating of match information.
- Low profile.

## TODO

- [ ] Handle cases where HTML validation is not working and we receive bad data
- [ ] Add visual representation of balls made/left
- [ ] Shot clock
- [ ] Save game (to text file, db in the future)
- [ ] Snapshot (capture game state to importable file)
- [ ] Simple mode (names, race, and score)
- [ ] Reload match (from exisitng localStorage)

## Usage

### OBS Studio

#### Browser Source

**Add a New Browser Source**
- In the OBS Studio main window, right-click in the "Sources" box.
- Select "Add" > "Browser."

**Name Your Source**
Enter a name for your source (e.g., "Score Board").

**Configure the Browser Source**
- In the properties window for the Browser source, you'll see several settings:
  - Local File: **Leave un-checked**
  - URL: Enter the path to your local file path URI. (example: "file:///c:/{path/to/file}/browser-source.html")
  - Width and Height: Set the dimensions of your dock. You can adjust these later if needed.
    - We recommend either 1920x1080 or 1225x90.
  - Custom CSS: If your file includes CSS styles, you can enter them here.

**Position Your Dock**
- In the main OBS Studio window, click and drag overlay to position it.
- Use the arrow keys on your keyboard for precise positioning.

#### Custom Dock

**Define a New Custom Dock**
- In the OBS Studio main window, click the "Docks" menu item.
- Select "Custom Browser Docks...".
- In the pop-out window define your custom dock.
  - Dock Name: Enter a name for your custom dock.
  - URL: Enter the path to your local file path URI. (example: "file:///c:/{path/to/file}/control-panel.html")

**Add Your New Custom Dock**
- In the OBS Studio main window, click the "Docks" menu item.
- Select your custom dock from the list at the bottom of the tab.

### Stream Labs
  **_Coming Soon..._**



## License

This project is licensed under the GNU General Public License V3 or later - see the [LICENSE](https://www.gnu.org/licenses/lgpl.html) file for details.

[![License](https://www.gnu.org/graphics/gplv3-or-later.png)](LICENSE)

## Acknowledgements
  **_Coming Soon_**

## Contributing
  **_Coming Soon_**

## Support
  **_Coming Soon_**

