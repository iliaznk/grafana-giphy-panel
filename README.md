# Giphy Panel

A Grafana panel plugin that displays an image from Giphy found by a search phrase.

## Usage

1. Install the plugin into Grafana.
2. Create a new dashboard or add a panel to an existing one and select "Choose Visualization".
3. Find and select "Giphy GIF" plugin.
4. Use the "Search Query" field as well as "Browse Results" buttons to find an image you like.
5. Save your dashboard.

## Docker Image

A quick way to see the plugin in action is to run a Docker container with the plugin pre-installed:

```bash
docker run -d -p 3000:3000 --name grafana-giphy iznk/grafana-giphy-panel:1.0
```

Then just go to http://localhost:3000 and follow the usage instructions starting from item 2.

## Potential Improvements

If I had a bit more time the next thing I'd add to the plugin is network/API error-handling. Having my Giphy API key in the source code isn't a very good idea either... In real world it must be either provided by a secret management tool or the users could be required to provide their own keys for the plugin to work. 
