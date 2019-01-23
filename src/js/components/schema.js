import Ajv from 'ajv';
import JSONSchemaBridge from 'uniforms/JSONSchemaBridge';


const schema = {
    "title": "Awesome-Schema",
    "description": "Schema v0.1, still in alpha.",
    "type": "object",
    "properties": {
        "version": {
            "type": "number",
            "enum": [
                0.1
            ],
            "description": "Version of the schema adopted"
        },
        "slug": {
            "type": "string",
            "description": "URI of the entry. Preferably an unspaced version of the 'title' or something very similar."
        },
        "title": {
            "type": "string",
            "description": "Title of the entry"
        },
        "category": {
            "type": "array",
            "minItems": 1,
            "maxItems": 3,
            "items": {
                "type": "string"
            }
        },
        "sources": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "git",
                        "svn",
                        "archive",
                        "binary",
                        "document",
                        "website",
                        "ftp",
                        "irc",
                        "discord",
                        "slack",
                        "telegram",
                        "other"
                    ]
                },
                "url": {
                    "type": "string"
                },
                "isa": {
                    "$ref": "#/definitions/properties/isa"
                },
                "os": {
                    "$ref": "#/definitions/properties/os"
                }
            },
            "required": [
                "type",
                "url"
            ],
            "maxProperties": 4
        },
        "files": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "archive",
                            "binary",
                            "iso",
                            "document",
                            "other"
                        ]
                    },
                    "url": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "md5": {
                        "type": "string",
                        "pattern": "^[a-f0-9]{32}$"
                    },
                    "sha1": {
                        "type": "string",
                        "pattern": "^[a-f0-9]{40}$"
                    },
                    "sha256": {
                        "type": "string",
                        "pattern": "^[a-f0-9]{64}$"
                    },
                    "isa": {
                        "$ref": "#/definitions/properties/isa"
                    },
                    "os": {
                        "$ref": "#/definitions/properties/os"
                    }
                },
                "minItems": 1,
                "uniqueItems": true
            }
        },
        "description": {
            "type": "string",
            "minLength": 1,
            "maxLength": 256
        },
        "license": {
            "type": "string",
            "minLength": 2,
            "maxLength": 16
        },
        "website": {
            "$ref": "#/definitions/patterns/ftp_http_https_url"
        },
        "demo": {
            "type": "string",
            "minLength": 10,
            "maxLength": 256
        },
        "paper": {
            "type": "object",
            "properties": {
                "url": {
                    "$ref": "#/definitions/patterns/ftp_http_https_url"
                },
                "abstract": {
                    "type": "string",
                    "minLength": 10,
                    "maxLength": 256
                }
            },
            "required": [
                "url"
            ],
            "minProperties": 1,
            "maxProperties": 2
        },
        "authors": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
                "type": "string",
                "minLength": 2,
                "maxLength": 32
            }
        },
        "aliases": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
                "type": "string",
                "minLength": 1,
                "maxLength": 64
            }
        },
        "tags": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
                "type": "string",
                "minLength": 1,
                "maxLength": 24
            }
        },
        "original": {
            "type": "boolean"
        },
        "multimedia": {
            "type": "object",
            "properties": {
                "images": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "file": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            }
                        },
                        "minItems": 1,
                        "uniqueItems": true
                    }
                },
                "videos": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "file": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            }
                        },
                        "minItems": 1,
                        "uniqueItems": true
                    }
                }
            },
            "minProperties": 1,
            "maxProperties": 2
        }
    },
    "required": [
        "version",
        "slug",
        "title",
        "category",
        "sources"
    ],
    "definitions": {
        "properties": {
            "isa": {
                "type": "array",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            },
            "os": {
                "type": "array",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            }
        },
        "patterns": {
            "ftp_http_https_url": {
                "type": "string",
                "minLength": 10,
                "pattern": "^(?:(?:(?:https?|ftp):)?\\\/\\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?))(?::\\d{2,5})?(?:[\/?#]\\S*)?$"
            }
        }
    }
};



const validator = new Ajv({
    allErrors: true,
    useDefaults: true
}).compile(schema);

const schemaValidator = model => {
    validator(model);

    if (validator.errors && validator.errors.length) {
        throw {
            details: validator.errors
        };
    }
};

export const bridge = new JSONSchemaBridge(schema, schemaValidator);
