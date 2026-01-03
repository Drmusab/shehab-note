/**
 * Graph Styling Utilities
 * Centralized styling functions for the graph visualization
 */

/**
 * Get the glow effect style for a node
 * @param color - The base color of the node
 * @param intensity - Glow intensity (0.0 - 1.0)
 * @param radius - Glow radius in pixels
 * @returns CSS box-shadow string
 */
export function getNodeGlowStyle(color: string, intensity: number = 0.6, radius: number = 20): string {
    const glowOpacity = Math.min(Math.max(intensity, 0), 1);
    return `0 0 ${radius}px ${radius * 0.5}px ${color.replace(/[\d.]+\)$/g, `${glowOpacity})`)}, 0 0 ${radius * 0.5}px ${color}`;
}

/**
 * Calculate node opacity based on zoom level
 * @param zoomLevel - Current zoom level (0.0 - infinity)
 * @param fadeThreshold - Zoom threshold for fading (default 0.5)
 * @returns Opacity value (0.0 - 1.0)
 */
export function calculateLabelOpacity(zoomLevel: number, fadeThreshold: number = 0.5): number {
    if (zoomLevel >= 0.8) {
        return 1.0; // Fully visible when zoomed in
    } else if (zoomLevel <= fadeThreshold) {
        return 0.0; // Hidden when zoomed out
    } else {
        // Gradual transition between fadeThreshold and 0.8
        return (zoomLevel - fadeThreshold) / (0.8 - fadeThreshold);
    }
}

/**
 * Get the CSS variables from the current theme
 * @returns Object containing graph-related CSS variables
 */
export function getGraphThemeVariables(): {
    glowColor: string;
    glowRadius: string;
    edgeFlowColor: string;
    labelFadeOpacity: string;
} {
    const rootStyle = getComputedStyle(document.body);
    return {
        glowColor: rootStyle.getPropertyValue('--b3-graph-glow-color').trim(),
        glowRadius: rootStyle.getPropertyValue('--b3-graph-glow-radius').trim(),
        edgeFlowColor: rootStyle.getPropertyValue('--b3-graph-edge-flow-color').trim(),
        labelFadeOpacity: rootStyle.getPropertyValue('--b3-graph-label-fade-opacity').trim(),
    };
}

/**
 * Apply semantic coloring based on node type
 * @param nodeType - Type of the node (NodeDocument, NodeParagraph, etc.)
 * @returns Color object for vis.js
 */
export function getSemanticColor(nodeType: string): { background: string } {
    const rootStyle = getComputedStyle(document.body);
    const colorMap: { [key: string]: string } = {
        'NodeDocument': '--b3-graph-doc-point',
        'NodeParagraph': '--b3-graph-p-point',
        'NodeHeading': '--b3-graph-heading-point',
        'NodeMathBlock': '--b3-graph-math-point',
        'NodeCodeBlock': '--b3-graph-code-point',
        'NodeTable': '--b3-graph-table-point',
        'NodeList': '--b3-graph-list-point',
        'NodeListItem': '--b3-graph-listitem-point',
        'NodeBlockquote': '--b3-graph-bq-point',
        'NodeCallout': '--b3-graph-callout-point',
        'NodeSuperBlock': '--b3-graph-super-point',
        'tag': '--b3-graph-tag-point',
        'textmark tag': '--b3-graph-tag-point',
    };
    
    const cssVar = colorMap[nodeType] || '--b3-graph-p-point';
    return { background: rootStyle.getPropertyValue(cssVar).trim() };
}
