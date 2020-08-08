import React from 'react';

export class Foo {
  foo() {
    const foo = { bar: true };
    return { ...foo };
  }
}

export const Bar = <div />;
