/**
 * Graph Animation Controllers
 * Handles flow animations and other dynamic effects
 */

/**
 * Flow animation controller for edges
 */
export class EdgeFlowAnimation {
    private network: any;
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private animationFrame: number | null = null;
    private dashOffset: number = 0;
    private speed: number = 50; // pixels per second
    private enabled: boolean = true;

    constructor(network: any, speed: number = 50, enabled: boolean = true) {
        this.network = network;
        this.speed = speed;
        this.enabled = enabled;
    }

    /**
     * Start the flow animation
     */
    public start(): void {
        if (!this.enabled || !this.network) {
            return;
        }

        try {
            this.canvas = this.network.canvas.frame.canvas;
            this.ctx = this.canvas?.getContext("2d");
            
            if (this.ctx) {
                this.animate();
            }
        } catch (e) {
            console.warn("EdgeFlowAnimation: Could not access canvas", e);
        }
    }

    /**
     * Stop the flow animation
     */
    public stop(): void {
        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    /**
     * Update animation speed
     */
    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    /**
     * Enable or disable the animation
     */
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!enabled) {
            this.stop();
        } else {
            this.start();
        }
    }

    /**
     * Animation loop
     */
    private animate = (): void => {
        if (!this.enabled) {
            return;
        }

        // Update dash offset for animated flow effect
        this.dashOffset += this.speed / 60; // Assuming 60 FPS
        if (this.dashOffset > 20) {
            this.dashOffset = 0;
        }

        // Request the network to redraw
        if (this.network && this.network.redraw) {
            try {
                this.network.redraw();
            } catch (e) {
                // Network might be destroyed
                this.stop();
                return;
            }
        }

        this.animationFrame = requestAnimationFrame(this.animate);
    };

    /**
     * Get current dash offset for use in edge rendering
     */
    public getDashOffset(): number {
        return this.dashOffset;
    }
}

/**
 * Pulsing animation for focused nodes
 */
export class NodePulseAnimation {
    private network: any;
    private pulseNodes: Set<string> = new Set();
    private pulsePhase: number = 0;
    private animationFrame: number | null = null;
    private enabled: boolean = true;

    constructor(network: any, enabled: boolean = true) {
        this.network = network;
        this.enabled = enabled;
    }

    /**
     * Add a node to the pulse animation
     */
    public addNode(nodeId: string): void {
        this.pulseNodes.add(nodeId);
        if (this.enabled && this.animationFrame === null) {
            this.animate();
        }
    }

    /**
     * Remove a node from the pulse animation
     */
    public removeNode(nodeId: string): void {
        this.pulseNodes.delete(nodeId);
        if (this.pulseNodes.size === 0) {
            this.stop();
        }
    }

    /**
     * Clear all pulsing nodes
     */
    public clear(): void {
        this.pulseNodes.clear();
        this.stop();
    }

    /**
     * Stop the pulse animation
     */
    public stop(): void {
        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    /**
     * Enable or disable the animation
     */
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!enabled) {
            this.stop();
        } else if (this.pulseNodes.size > 0) {
            this.animate();
        }
    }

    /**
     * Animation loop
     */
    private animate = (): void => {
        if (!this.enabled || this.pulseNodes.size === 0) {
            this.stop();
            return;
        }

        this.pulsePhase += 0.05;
        if (this.pulsePhase > Math.PI * 2) {
            this.pulsePhase = 0;
        }

        // Update nodes with pulsing effect
        // This would require custom rendering in vis.js
        // For now, we just maintain the animation loop
        if (this.network && this.network.redraw) {
            try {
                this.network.redraw();
            } catch (e) {
                this.stop();
                return;
            }
        }

        this.animationFrame = requestAnimationFrame(this.animate);
    };

    /**
     * Get current pulse scale factor
     */
    public getPulseScale(): number {
        return 1.0 + Math.sin(this.pulsePhase) * 0.15; // Pulse between 0.85 and 1.15
    }
}
