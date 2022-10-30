const fs = require('fs')
const pkg = require('./package.json')

const config = {
    "version": pkg.version,
    "key": "slide",
    "name": "Slide",
    "description": "Slide Macro",
    "vendor": {
        "name": "Sanofi IADC",
        "url": "https://github.com/Sanofi-IADC"
    },
    "baseUrl": "",
    "authentication": {
        "type": "jwt"
    },
    "lifecycle": {
        "installed": "/installed"
    },
    "scopes": [
        "READ"
    ],
    "apiMigrations": {
        "signed-install": true
    },
    "modules": {
        "staticContentMacros": [
            {
                "url": "/slide?macroId={macro.id}&pageId={page.id}&pageVersion={page.version}",
                "description": {
                    "value": "The text included in the body of this macro will not be rendered in the Confluence page or in konviw."
                },
                "bodyType": "none",
                "name": {
                    "value": "Slide Deck Settings"
                },
                "key": "slideSettings",
                "parameters": [
                    {
                        "identifier": "slide_settings_title",
                        "name": {
                            "value": "Slide deck title"
                        },
                        "description": {
                            "value": "Specify the title or description of the slide deck."
                        },
                        "type": "string",
                        "required": false,
                        "multiple": false,
                        "defaultValue": "",
                        "hidden": false
                    },
                    {
                        "identifier": "slide_settings_theme",
                        "name": {
                            "value": "Slide theme"
                        },
                        "description": {
                            "value": "Specify the template to be used to render the slide. Available themes are 'digital', 'iadc', 'konviw', ..."
                        },
                        "type": "enum",
                        "required": true,
                        "multiple": false,
                        "defaultValue": "digital",
                        "values": [
                            "digital",
                            "iadc",
                            "konviw"
                        ],
                        "hidden": false
                    },
                    {
                        "identifier": "slide_settings_transition",
                        "name": {
                            "value": "Slide transition"
                        },
                        "description": {
                            "value": "Specify the slide transition to use in the move between slides: slide (default), zoom, convex, fade, ..."
                        },
                        "type": "enum",
                        "required": false,
                        "multiple": false,
                        "defaultValue": "slide",
                        "values": [
                            "none",
                            "fade",
                            "slide",
                            "convex",
                            "concave",
                            "zoom"
                        ],
                        "hidden": false
                    }
                ]
            },
            {
                "url": "/slide?macroId={macro.id}&pageId={page.id}&pageVersion={page.version}&slideId={slide_id}",
                "description": {
                    "value": "Enter any rich text in the body of this macro so it will be rendered as a new slide."
                },
                "bodyType": "rich-text",
                "name": {
                    "value": "Slide"
                },
                "key": "slide",
                "parameters": [
                    {
                        "identifier": "slide_id",
                        "name": {
                            "value": "Slide ID"
                        },
                        "description": {
                            "value": "Specify an ID if you have multiple slides."
                        },
                        "type": "string",
                        "required": false,
                        "multiple": false,
                        "defaultValue": "",
                        "hidden": false
                    },
                    {
                        "identifier": "slide_type",
                        "name": {
                            "value": "Slide type"
                        },
                        "description": {
                            "value": "Specify the slide type to use from the values available in your style: cover, default, bubble, ..."
                        },
                        "type": "enum",
                        "required": false,
                        "multiple": false,
                        "defaultValue": "default",
                        "values": [
                            "cover",
                            "default",
                            "bubble",
                            "blank",
                            "new-section"
                        ],
                        "hidden": false
                    },
                    {
                        "identifier": "slide_transition",
                        "name": {
                            "value": "Slide transition"
                        },
                        "description": {
                            "value": "Specify the slide transition to use in the move from this slide to the next one: slide (default), zoom, convex, fade, ..."
                        },
                        "type": "enum",
                        "required": false,
                        "multiple": false,
                        "defaultValue": "none",
                        "values": [
                            "none",
                            "fade",
                            "slide",
                            "convex",
                            "concave",
                            "zoom"
                        ],
                        "hidden": false
                    },
                    {
                        "identifier": "slide_paragraph_animation",
                        "name": {
                            "value": "Paragraph animation"
                        },
                        "description": {
                            "value": "Do You want animated paragraph?"
                        },
                        "type": "enum",
                        "required": false,
                        "multiple": false,
                        "defaultValue": "no",
                        "values": [
                            "no",
                            "yes"
                        ],
                        "hidden": false
                    },
                    {
                        "identifier": "slide_background_attachment",
                        "name": {
                            "value": "Background image or video"
                        },
                        "description": {
                            "value": "Specify the name of an attachment that will be used as background image or video."
                        },
                        "type": "attachment",
                        "required": false,
                        "multiple": false,
                        "defaultValue": "",
                        "hidden": false
                    }
                ]
            }
        ]
    }
}

config.baseUrl = process.env.APP_BASE_URL

const writeStream = fs.createWriteStream('atlassian-connect.json')
writeStream.write(JSON.stringify(config))
writeStream.end()
