/**
 * Label Collision Detection and Management
 * Handles smart label placement to prevent overlaps
 * Note: This is a placeholder for future Phase 2 implementation
 */

export interface LabelPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface NodeLabel {
    nodeId: string;
    label: string;
    position: LabelPosition;
    priority: number; // Based on centrality
}

/**
 * Label collision detection manager
 * Future implementation will use spatial hashing or quadtree
 */
export class LabelManager {
    private labels: Map<string, NodeLabel> = new Map();

    /**
     * Add or update a label
     */
    public addLabel(nodeId: string, label: string, position: LabelPosition, priority: number = 0): void {
        this.labels.set(nodeId, {
            nodeId,
            label,
            position,
            priority
        });
    }

    /**
     * Remove a label
     */
    public removeLabel(nodeId: string): void {
        this.labels.delete(nodeId);
    }

    /**
     * Check if a position collides with existing labels
     * @returns true if collision detected
     */
    public hasCollision(position: LabelPosition, excludeNodeId?: string): boolean {
        for (const [nodeId, labelInfo] of this.labels.entries()) {
            if (excludeNodeId && nodeId === excludeNodeId) {
                continue;
            }
            if (this.checkOverlap(position, labelInfo.position)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if two rectangles overlap
     */
    private checkOverlap(a: LabelPosition, b: LabelPosition): boolean {
        return !(a.x + a.width < b.x || 
                 b.x + b.width < a.x || 
                 a.y + a.height < b.y || 
                 b.y + b.height < a.y);
    }

    /**
     * Find best position for a label (multiple position attempts)
     * Returns null if all positions collide
     */
    public findBestPosition(
        nodeId: string,
        label: string,
        basePosition: LabelPosition,
        priority: number
    ): LabelPosition | null {
        // Try positions: right, left, top, bottom
        const positions = [
            basePosition, // right (default)
            { ...basePosition, x: basePosition.x - basePosition.width - 10 }, // left
            { ...basePosition, y: basePosition.y - basePosition.height - 10 }, // top
            { ...basePosition, y: basePosition.y + basePosition.height + 10 }, // bottom
        ];

        for (const pos of positions) {
            if (!this.hasCollision(pos, nodeId)) {
                return pos;
            }
        }

        // If all positions collide, check priority
        // Hide labels with lower priority
        return null;
    }

    /**
     * Clear all labels
     */
    public clear(): void {
        this.labels.clear();
    }

    /**
     * Get all visible labels
     */
    public getVisibleLabels(): NodeLabel[] {
        return Array.from(this.labels.values());
    }
}
