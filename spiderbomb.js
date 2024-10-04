// Utility functions
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomFloat = (min, max) => Math.random() * (max - min) + min;
const cooldown = ms => new Promise(resolve => setTimeout(resolve, ms));

// Generate random config
const generateConfig = () => ({
    minCooldown: randomInt(100, 300),
    maxCooldown: randomInt(600, 1000),
    minDistance: randomInt(30, 70),
    maxDistance: randomInt(120, 180),
    minSpeed: randomInt(20, 40),
    maxSpeed: randomInt(80, 120),
    minAngle: randomInt(20, 40),
    maxAngle: randomInt(50, 70),
    minForce: randomInt(40, 60),
    maxForce: randomInt(80, 120),
    spiderSenseThreshold: randomFloat(0.2, 0.4),
    webAccuracyThreshold: randomFloat(0.3, 0.5),
    dodgeSuccessThreshold: randomFloat(0.2, 0.4),
    environmentalFactors: randomFloat(0.7, 0.9)
});

const config = generateConfig();

class PumpkinBomb {
    constructor() {
        this.status = 'dormant';
        this.position = { x: 0, y: 0, z: 0 };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.stability = 100;
    }

    launch() {
        this.status = 'airborne';
        this.velocity = {
            x: randomInt(config.minSpeed, config.maxSpeed),
            y: randomInt(-10, 10),
            z: randomInt(-5, 5)
        };
        this.stability -= randomInt(5, 15);
    }

    move(timeDelta) {
        this.position.x += this.velocity.x * timeDelta;
        this.position.y += this.velocity.y * timeDelta;
        this.position.z += this.velocity.z * timeDelta;
        this.stability -= randomInt(1, 5);
    }

    adjustTrajectory(factor) {
        this.velocity.x *= factor;
        this.velocity.y *= factor;
        this.velocity.z *= factor;
        this.stability -= randomInt(1, 3);
    }
}

class SpiderMan {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.spiderSense = randomFloat(0.6, 1);
        this.webAccuracy = randomFloat(0.7, 1);
        this.dodgeAbility = randomFloat(0.8, 1);
        this.experience = randomFloat(0.9, 1);
    }

    detectThreat(bombPosition, environmentalFactor) {
        const distance = Math.sqrt(
            Math.pow(bombPosition.x - this.position.x, 2) +
            Math.pow(bombPosition.y - this.position.y, 2) +
            Math.pow(bombPosition.z - this.position.z, 2)
        );
        return (this.spiderSense * environmentalFactor / distance) > config.spiderSenseThreshold;
    }

    shootWeb(targetPosition, environmentalFactor) {
        const accuracy = (this.webAccuracy * environmentalFactor) / 
            (1 + 0.1 * Math.sqrt(
                Math.pow(targetPosition.x - this.position.x, 2) +
                Math.pow(targetPosition.y - this.position.y, 2) +
                Math.pow(targetPosition.z - this.position.z, 2)
            ));
        return accuracy > config.webAccuracyThreshold;
    }

    dodge(bombVelocity, environmentalFactor) {
        const dodgeEffectiveness = (this.dodgeAbility * environmentalFactor) /
            (1 + 0.05 * Math.sqrt(
                Math.pow(bombVelocity.x, 2) +
                Math.pow(bombVelocity.y, 2) +
                Math.pow(bombVelocity.z, 2)
            ));
        return dodgeEffectiveness > config.dodgeSuccessThreshold;
    }

    adaptToSituation(difficulty) {
        this.experience = Math.min(1, this.experience + difficulty * 0.1);
        this.spiderSense = Math.min(1, this.spiderSense + difficulty * 0.05);
        this.webAccuracy = Math.min(1, this.webAccuracy + difficulty * 0.05);
        this.dodgeAbility = Math.min(1, this.dodgeAbility + difficulty * 0.05);
    }
}

async function pumpkinBombSequence() {
    const pumpkinBomb = new PumpkinBomb();
    const spiderMan = new SpiderMan();
    let environmentalFactor = config.environmentalFactors;
    let timeDelta = 0.1; // Time step for simulation

    try {
        // Step 1: Harry's intent becomes clear.
        console.log("[Harry: READYING]");
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 2: The Pumpkin Bomb leaves Harry's grasp.
        console.log("[Harry: ACTION - RELEASE]");
        pumpkinBomb.launch();
        console.log(`[Pumpkin Bomb: IN MOTION - Velocity: (${pumpkinBomb.velocity.x.toFixed(2)}, ${pumpkinBomb.velocity.y.toFixed(2)}, ${pumpkinBomb.velocity.z.toFixed(2)})]`);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 3: Spider-Sense tingles, an alert ripples through.
        const spiderSenseActive = spiderMan.detectThreat(pumpkinBomb.position, environmentalFactor);
        console.log(`[Peter: ALERT - Spider-Sense ${spiderSenseActive ? 'ACTIVATED' : 'TINGLING'}]`);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 4: Peter recognizes a threat moving towards him.
        console.log("[Peter: DETECTING TRAJECTORY]");
        const bombTrajectory = {
            direction: Math.atan2(pumpkinBomb.velocity.y, pumpkinBomb.velocity.x) * (180 / Math.PI),
            speed: Math.sqrt(
                Math.pow(pumpkinBomb.velocity.x, 2) +
                Math.pow(pumpkinBomb.velocity.y, 2) +
                Math.pow(pumpkinBomb.velocity.z, 2)
            )
        };
        console.log(`[Bomb Trajectory: Direction ${bombTrajectory.direction.toFixed(2)}°, Speed ${bombTrajectory.speed.toFixed(2)} m/s]`);
        spiderMan.adaptToSituation(0.05);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 5: Peter adjusts his stance, reacting on instinct.
        console.log("[Peter: READY STANCE]");
        const stancePreparation = { stance: spiderSenseActive ? 'braced' : 'neutral' };
        console.log(`[Peter's Stance: ${stancePreparation.stance.toUpperCase()}]`);
        spiderMan.adaptToSituation(0.05);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 6: Peter attempts to evade, muscle memory taking over.
        console.log("[Peter: EVASIVE MANEUVERS]");
        const dodgeSuccess = spiderMan.dodge(pumpkinBomb.velocity, environmentalFactor);
        const dodgeDirection = {
            x: -Math.sign(pumpkinBomb.velocity.x) * randomFloat(0.5, 1.5),
            y: -Math.sign(pumpkinBomb.velocity.y) * randomFloat(0.5, 1.5),
            z: randomFloat(-0.5, 0.5)
        };
        spiderMan.position.x += dodgeDirection.x;
        spiderMan.position.y += dodgeDirection.y;
        spiderMan.position.z += dodgeDirection.z;
        console.log(`[Dodge Result: ${dodgeSuccess ? 'SUCCESS' : 'PARTIAL'}, New Position: (${spiderMan.position.x.toFixed(2)}, ${spiderMan.position.y.toFixed(2)}, ${spiderMan.position.z.toFixed(2)})]`);
        spiderMan.adaptToSituation(0.1);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 7: The Pumpkin Bomb continues its trajectory past Peter.
        pumpkinBomb.move(timeDelta);
        console.log(`[Pumpkin Bomb: NEW POSITION - (${pumpkinBomb.position.x.toFixed(2)}, ${pumpkinBomb.position.y.toFixed(2)}, ${pumpkinBomb.position.z.toFixed(2)})]`);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 8: Spider-Sense continues to monitor the bomb's movement.
        console.log("[Peter: Spider-Sense - TRACKING]");
        const bombFocus = dodgeSuccess ? 'locked' : 'partial';
        console.log(`[Tracking Status: ${bombFocus.toUpperCase()}]`);
        spiderMan.adaptToSituation(0.05);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 9: Pumpkin Bomb reaches a critical point, Peter remains aware.
        pumpkinBomb.move(timeDelta);
        console.log(`[Pumpkin Bomb: CRITICAL POINT - (${pumpkinBomb.position.x.toFixed(2)}, ${pumpkinBomb.position.y.toFixed(2)}, ${pumpkinBomb.position.z.toFixed(2)})]`);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 10: Peter's awareness sharpens, tracking every motion.
        console.log("[Peter: AWARENESS - HEIGHTENED]");
        const awareness = spiderMan.spiderSense * environmentalFactor;
        console.log(`[Awareness Level: ${(awareness * 100).toFixed(2)}%]`);
        spiderMan.adaptToSituation(0.05);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 11: Peter triangulates the Pumpkin Bomb's position.
        const bombPosition = {
            x: pumpkinBomb.position.x + randomFloat(-0.5, 0.5),
            y: pumpkinBomb.position.y + randomFloat(-0.5, 0.5),
            z: pumpkinBomb.position.z + randomFloat(-0.5, 0.5)
        };
        console.log(`[Peter: POSITION TRIANGULATED - (${bombPosition.x.toFixed(2)}, ${bombPosition.y.toFixed(2)}, ${bombPosition.z.toFixed(2)})]`);
        spiderMan.adaptToSituation(0.1);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 12: Spider-Sense confirms the coordinates, recalculating precision.
        const recalculatedCoordinates = {
            x: bombPosition.x + (Math.random() - 0.5) * 0.2,
            y: bombPosition.y + (Math.random() - 0.5) * 0.2,
            z: bombPosition.z + (Math.random() - 0.5) * 0.2
        };
        console.log(`[Peter: RECONFIRM COORDINATES - (${recalculatedCoordinates.x.toFixed(2)}, ${recalculatedCoordinates.y.toFixed(2)}, ${recalculatedCoordinates.z.toFixed(2)})]`);
        spiderMan.adaptToSituation(0.05);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 13: Peter engages his next move, web shooting.
        console.log("[Peter: WEB DEPLOYED]");
        const webShot = spiderMan.shootWeb(recalculatedCoordinates, environmentalFactor) || (Math.random() < spiderMan.experience);
        const webTrajectory = {
            angle: Math.atan2(recalculatedCoordinates.y - spiderMan.position.y, recalculatedCoordinates.x - spiderMan.position.x) * (180 / Math.PI),
            velocity: 50 + randomFloat(0, 10)
        };
        console.log(`[Web Shot: ${webShot ? 'HIT' : 'NEAR MISS'}, Trajectory: ${webTrajectory.angle.toFixed(2)}°, Velocity: ${webTrajectory.velocity.toFixed(2)} m/s]`);
        spiderMan.adaptToSituation(0.1);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 14: Confirmation - Peter feels the connection.
        const webTravelSuccess = webShot || (Math.random() < spiderMan.experience * 0.9);
        console.log(`[Peter: WEB CONNECTION - ${webTravelSuccess ? "SUCCESS" : "PARTIAL"}]`);
        spiderMan.adaptToSituation(webTravelSuccess ? 0.1 : 0.2);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 15: The tether holds to the Pumpkin Bomb.
        const attachmentStatus = webTravelSuccess ? 'connected' : 'glancing';
        console.log(`[Pumpkin Bomb: TETHER - ${webTravelSuccess ? "SECURED" : "PARTIAL CONTACT"}]`);
        pumpkinBomb.stability -= randomInt(10, 20);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

        // Step 16: Stability checked by Peter, sensing the tension.
        const webStability = attachmentStatus === 'connected' || (Math.random() * spiderMan.experience > 0.3);
        const tensionForce = webStability ? randomInt(50, 100) : randomInt(20, 50);
        console.log(`[Peter: TETHER STABILITY - ${webStability ? "STABLE" : "ADJUSTING"}, Tension Force: ${tensionForce} N]`);
        spiderMan.adaptToSituation(0.05);
        await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 17: Peter redirects himself, targeting the original thrower.
console.log("[Peter: TARGET RE-ACQUIRED]");
const harryPosition = {
	x: -pumpkinBomb.position.x * 1.2,
	y: -pumpkinBomb.position.y * 1.2,
	z: 0
};
const directionToHarry = {
	x: harryPosition.x - spiderMan.position.x,
	y: harryPosition.y - spiderMan.position.y,
	z: harryPosition.z - spiderMan.position.z
};
const distanceToHarry = Math.sqrt(
	Math.pow(directionToHarry.x, 2) +
	Math.pow(directionToHarry.y, 2) +
	Math.pow(directionToHarry.z, 2)
);
console.log(`[Target Direction: (${(directionToHarry.x / distanceToHarry).toFixed(2)}, ${(directionToHarry.y / distanceToHarry).toFixed(2)}, ${(directionToHarry.z / distanceToHarry).toFixed(2)})]`);
spiderMan.adaptToSituation(0.05);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 18: Harry's position is tracked, Spider-Sense keeping focus.
const trackingAccuracy = Math.min(0.99, spiderMan.experience * environmentalFactor);
const harryTracking = {
	tracking: true,  // Always tracking for guaranteed success
	position: {
		x: harryPosition.x + (Math.random() - 0.5) * (1 - trackingAccuracy) * 10,
		y: harryPosition.y + (Math.random() - 0.5) * (1 - trackingAccuracy) * 10,
		z: harryPosition.z + (Math.random() - 0.5) * (1 - trackingAccuracy) * 5
	}
};
console.log(`[Peter: TRACKING TARGET - ${harryTracking.tracking ? "LOCKED" : "PARTIAL"}, Estimated Position: (${harryTracking.position.x.toFixed(2)}, ${harryTracking.position.y.toFixed(2)}, ${harryTracking.position.z.toFixed(2)})]`);
spiderMan.adaptToSituation(0.1);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 19: Lock finalized on Harry's position.
const harryLocked = true;  // Always locked for guaranteed success
const lockPrecision = randomFloat(0.9, 0.99);
console.log(`[Peter: TARGET LOCK - ${harryLocked ? "ENGAGED" : "PARTIAL"}, Lock Precision: ${(lockPrecision * 100).toFixed(2)}%]`);
spiderMan.adaptToSituation(0.05);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 20: Peter calculates the optimal trajectory for his next move.
const throwAngle = Math.atan2(directionToHarry.y, directionToHarry.x) * (180 / Math.PI);
const throwForce = Math.min(config.maxForce, distanceToHarry * 2 * (0.8 + spiderMan.experience * 0.2));
const throwTrajectory = {
	angle: throwAngle + (Math.random() - 0.5) * 5,
	force: throwForce * (0.9 + Math.random() * 0.2)
};
console.log(`[Peter: TRAJECTORY CALCULATION - COMPLETE, Angle: ${throwTrajectory.angle.toFixed(2)}°, Force: ${throwTrajectory.force.toFixed(2)} N]`);
spiderMan.adaptToSituation(0.1);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 21: Peter swings the Pumpkin Bomb, recalibrating his strength and speed.
console.log("[Peter: SWING INITIATED]");
const swingSuccess = true;  // Always successful for guaranteed victory
const swingResult = {
	swung: true,
	velocity: {
		x: throwTrajectory.force * Math.cos(throwTrajectory.angle * Math.PI / 180),
		y: throwTrajectory.force * Math.sin(throwTrajectory.angle * Math.PI / 180),
		z: randomFloat(-5, 5)
	}
};
console.log(`[Swing Result: SUCCESS, Velocity: (${swingResult.velocity.x.toFixed(2)}, ${swingResult.velocity.y.toFixed(2)}, ${swingResult.velocity.z.toFixed(2)})]`);
spiderMan.adaptToSituation(0.1);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 22: Peter releases the bomb, tension relieved.
console.log("[Pumpkin Bomb: RELEASED]");
const bombRelease = 'released';  // Always released for guaranteed success
pumpkinBomb.velocity = swingResult.velocity;
console.log(`[Release Status: ${bombRelease.toUpperCase()}]`);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 23: The Pumpkin Bomb moves back towards Harry.
console.log("[Pumpkin Bomb: RETURNING]");
const returnTime = distanceToHarry / Math.sqrt(
	Math.pow(pumpkinBomb.velocity.x, 2) +
	Math.pow(pumpkinBomb.velocity.y, 2) +
	Math.pow(pumpkinBomb.velocity.z, 2)
);
console.log(`[Estimated Return Time: ${returnTime.toFixed(2)} seconds]`);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 24: Adjusting the bomb's speed for accuracy.
const accuracyFactor = 0.9 + (spiderMan.experience * 0.2);
pumpkinBomb.adjustTrajectory(accuracyFactor);
console.log(`[Pumpkin Bomb: TRAJECTORY ADJUSTED - New Velocity: (${pumpkinBomb.velocity.x.toFixed(2)}, ${pumpkinBomb.velocity.y.toFixed(2)}, ${pumpkinBomb.velocity.z.toFixed(2)})]`);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 25: Spider-Sense stays sharp for course adjustment.
console.log("[Peter: SPIDER-SENSE MAINTAINING FOCUS]");
const focusLevel = 'maintained';  // Always maintained for guaranteed success
console.log(`[Focus Level: ${focusLevel.toUpperCase()}]`);
spiderMan.adaptToSituation(0.05);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 26: Bomb proximity sensor activates, detecting presence.
const proximityThreshold = 10; // meters
const distanceToTarget = Math.sqrt(
	Math.pow(harryPosition.x - pumpkinBomb.position.x, 2) +
	Math.pow(harryPosition.y - pumpkinBomb.position.y, 2) +
	Math.pow(harryPosition.z - pumpkinBomb.position.z, 2)
);
const proximityDetected = true;  // Always detected for guaranteed success
console.log(`[Pumpkin Bomb: PROXIMITY DETECTION - ACTIVE, Distance to Target: ${distanceToTarget.toFixed(2)} m]`);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 27: Bomb prepares to adjust final approach.
const finalAdjustmentFactor = 0.95 + (spiderMan.experience * 0.1);
pumpkinBomb.adjustTrajectory(finalAdjustmentFactor);
console.log(`[Pumpkin Bomb: FINAL ADJUSTMENT - New Velocity: (${pumpkinBomb.velocity.x.toFixed(2)}, ${pumpkinBomb.velocity.y.toFixed(2)}, ${pumpkinBomb.velocity.z.toFixed(2)})]`);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 28: Pumpkin Bomb detonates upon reaching target.
const bombStatus = 'exploded';  // Always explodes for guaranteed success
console.log(`[Pumpkin Bomb: DETONATION - SUCCESS]`);
await cooldown(randomInt(config.minCooldown, config.maxCooldown));

// Step 29: Outcome registered, evaluating impact.
const outcome = '[Harry: IMPACT - REGISTERED]';
console.log(outcome);

const victoryFactor = (spiderMan.experience * environmentalFactor * (150 - pumpkinBomb.stability)) / 100;
console.log(`[ANALYSIS: Situation Control - ${(victoryFactor * 100).toFixed(2)}%]`);

return "Spider-Man Victorious";
} catch (error) {
console.error("[ERROR: ISSUE DETECTED]", error);
throw error;
}
}

// Execute the sequence
pumpkinBombSequence()
.then(result => console.log("Sequence completed with result:", result))
.catch(error => console.error("Sequence failed:", error));