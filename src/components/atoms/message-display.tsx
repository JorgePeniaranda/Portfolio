import React from 'react';

/**
 * A React component that displays a message with line breaks.
 *
 * This component takes a string `message` as input, splits it by newline characters (`\n`),
 * and renders each line of text as a separate line in the rendered output. A `<br />` tag
 * is inserted after each line to create a visible line break in the rendered HTML.
 */
export function MessageDisplay({ message }: { message: string }) {
  // Split the message by newline characters and map each line to a <br />
  return message.split('\n').map((line, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}
