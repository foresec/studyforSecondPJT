import sys
input = sys.stdin.readline



# 0: 빈칸, 1: 머리. 2: 몸통(여러명), 3: 꼬리, 4: 이동경로

# 1. 줄이 한칸씩 이동
# 2. 이번 라운드의 공의라인
# 3. 해당 라운드 공의 라인에 사람이 있다면 점수+(머리와 꼬리도 바뀜)





def move():
    pass


def ball_shoot():
    pass


def score():
    pass

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]



N, M, K = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

visited = [[0] * N for _ in range(N)]
round = 0
line = []


# 일단 줄을 찾기
for i in range(N):
    for j in range(N):
        if visited[i][j] == 0 and 1 <= 

for k in range(K):
    pass



