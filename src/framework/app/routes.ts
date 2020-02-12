import React from 'react'
import { book } from "../../book";

export interface Route {
  title: string;
  path: string;
  document: React.ComponentType;
  children: {
    title: string;
    path: string;
    document: React.ComponentType;
  }[];
}

export const routes: Route[] = book.chapters.map((chapter, i) => ({
  title: chapter.title,
  path: `/chapter/${i}`,
  document: chapter.document,
  children: chapter.sections.map((section, j) => ({
    title: section.title,
    path: `/chapter/${i}/section/${j + 1}`,
    document: section.document
  }))
}))

routes.unshift({
  title: book.description.title,
  path: '/',
  document: book.description.document,
  children: []
})