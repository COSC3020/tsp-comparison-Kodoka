# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

## Preface

This has been an ordeal. I originally wanted to use my implementations, but HK
was going from approximately 80 seconds for a size 19 matrix to... Well, I never
rightly found out. After 14 hours on my desktop, and 12 on my laptop, I called
it quits. As far as I can tell, there is no reason my code stops functioning at
a size 20 matrix, I'm guessing that's just the way the empirical time balloons
up.

I then tried Aijun Hall's HK implementation, and that worked far too well. In
fact it was crashing long before hitting the 1 hour minimum that you requested,
as the matrices it could handle were absurdly large, and my computer was running
out of memory. If anything it seemed like the IO functions of my runtest.js were
taking longer than the algorithm was taking to solve pathing. Really impressive
work here.

Next I tried Noah Vogt's HK implementation. This seemed to balloon up to some
absurd empircal time when transitioning from a size 20 matrix to a size 21 as
well, as it failed to produce a solution for a size 21 matrix after running for
12 hours on my desktop and laptop. That said, it was a lot closer to the 1 hour
goal, with a size 20 matrix taking a little over 30 minutes. As such, I'm using
that for this submission.

## Methodology

For this exercise I put both alogorithms in a directory along side my test code
to make them easily accessible. My test file starts with a size 2 matrix
initially, and then iterates up until the previous time the HK algorithm took to
run exceeds 1 hour. Due to the way I coded my LS algorithm it always takes
approximately 50 milliseconds, so I'm really only looking for HK to exceed the
1 hour mark.

During each loop, my algorithm generates a matrix of appropriate size populated
with random values, 1-10 inclusive to represent the time necessary to travel
between each city. Prior to feeding each algorithm the same matrix, I get the
starting time via performance.now(). I then feed the algorithms the matrix, and
wait for them to return the length of their respective solutions, at which point
time is stopped, and the time they took calculated. The size of the matrix,
a square representation of the matrix, the time each algorithm took, and the
distance of each algorithm's final path is then printed to a results text file,
taking all of the heavy lifting, after putting in the initial coding effort,
out of my hands. Initially these results included the path each algorithm took,
but that was removed when I was trying to trouble shoot why my code couldn't
make the jump from a size 19 to size 20 matrix, and never reimplemented.

## Results

Again, due to my implementation, LS never hovers right around 50ms despite input
size. There is a little jitter in the exact millisecond timing, but I believe
this to be exclusively due to variance in how Date tracks time, which is how I
have the 50ms limit implemented in my LS code, versus how Performance tracks
time, which is how I track time in my tests.

THe HK implementation; however, based on the implementation I'm using, quickly
balloons out of control.

## Sources

I started with my TSP implementations, and while I an still using my LS, I no
long am using my HK:

https://github.com/COSC3020/tsp-held-karp-Kodoka
https://github.com/COSC3020/tsp-local-search-Kodoka

I briefly tried Aijun Hall's HK implementation:

https://github.com/COSC3020/tsp-held-karp-aijun-hall-uwyo

In my current implementation I am using Noah Vogt's HK implementation:

https://github.com/COSC3020/tsp-held-karp-noahvogt1

I used the Performance API as opposed to Date to get precise timing for my
metrics, and use the following docs to help with that:

https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/High_precision_timing


