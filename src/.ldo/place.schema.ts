import { Schema } from "shexj";

/**
 * =============================================================================
 * placeSchema: ShexJ Schema for place
 * =============================================================================
 */
export const placeSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/Place",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["https://schema.org/Place"],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://schema.org/name",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://schema.org/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://schema.org/geo",
              valueExpr: {
                type: "ShapeOr",
                shapeExprs: [
                  "https://ldo.js.org/GeoCoordinates",
                  "https://ldo.js.org/GeoShape",
                ],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/topic",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2002/07/owl#sameAs",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#seeAlsoseeAlso",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/created",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#dateTime",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/modified",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#dateTime",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/creator",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/GeoCoordinates",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["https://schema.org/GeoCoordinates"],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://schema.org/latitude",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#decimal",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://schema.org/longitude",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#decimal",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/GeoShape",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["https://schema.org/GeoShape"],
              },
            },
            {
              type: "OneOf",
              expressions: [
                {
                  type: "TripleConstraint",
                  predicate: "https://schema.org/polygon",
                  valueExpr: {
                    type: "NodeConstraint",
                    datatype: "http://www.w3.org/2001/XMLSchema#string",
                  },
                },
                {
                  type: "TripleConstraint",
                  predicate: "https://schema.org/box",
                  valueExpr: {
                    type: "NodeConstraint",
                    datatype: "http://www.w3.org/2001/XMLSchema#string",
                  },
                },
                {
                  type: "TripleConstraint",
                  predicate: "https://schema.org/circle",
                  valueExpr: {
                    type: "NodeConstraint",
                    datatype: "http://www.w3.org/2001/XMLSchema#string",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  ],
};
