import React from 'react'

export interface Document {
  title: string,
  document: React.ComponentType
}

export interface Section extends Document {
}

export interface Chapter extends Document {
  sections: Section[]
}

export interface Book {
  name: string,
  description: Document,
  chapters: Chapter[]
}