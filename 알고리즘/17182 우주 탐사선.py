
import sys
input = sys.stdin.readline
INF = sys.maxsize

# 모든 행성을 탐사하는데 걸리는 최소 시간


# 플로이드-워셜
def f1():
    for k in range(N):
        for i in range(N):
            for j in range(N):
                if journey[i][j] > journey[i][k] + journey[k][j]:
                    journey[i][j] = journey[i][k] + journey[k][j]


def f2(k, cnt, val, visited):
    global ans

    if val > ans:
        return

    if cnt == N:
        if ans > val:
            ans = val
            

    for i in range(N):
        if visited[i] == 0:
            visited[i] = 1
            f2(i, cnt + 1, val + journey[k][i], visited)
            visited[i] = 0
    

N, K = map(int, input().split())
journey = [list(map(int, input().split())) for _ in range(N)]

visited= [0] * N
ans = INF

f1()

visited[K] = 1
f2(K, 1, 0, visited)


print(ans)