---
title: '[Network] Cacti란?'
slug: 00-network-cacti
date: 2021-01-31
published: true
tags: ['Network', 'Monitoring', 'Cacti', 'Server', 'Backend']
series: false
cover_image: ./images/CactiLogo.png
canonical_url: false
description: 'Cacti에 대해 작성합니다.'
---

# Cacti

엄청 오래된 모니터링 툴이지만, 직접 설치를 하지 않더라도 어떤 개념인지는 알아야겠다는 생각이 있어 정리합니다.

## Cacti란

- SNMP 프로토콜을 사용하는 네트워크 **모니터링 툴**입니다.
- 관리 및 사용은 브라우저를 통해 이뤄지고, 모든 관리 데이터들은 MySQL을 이용하여 저장됩니다.
- Poller는 주어진 대상 시스템을 조회하여 가져온 결과를 RRD 파일에 저장하고 이 정보를 통해 그래프를 만드는데도 사용됩니다.

[공식 Document](https://docs.cacti.net/)

<br/>

## Cacti의 작업

### Data Retrieval

- poller를 사용해서 데이터를 검색합니다.
- Poller는 Unix의 Crontab과 같은 스케쥴러를 수행합니다.
- Cacti는 원격 대상의 데이터 검색에 네트워크 관리 프로토콜인 SNMP를 사용합니다.
  - Cacti는 SNMP를 사용할 수 있는 모든 디바이스를 모니터링 할 수 있습니다.

### Data Storage

- Cacti를 데이터를 저장하기 위해 RRDTool을 사용합니다.
- 히스토리 데이터는 공간 절약을 위해 압축합니다.

### Data Presentation

- 그래프 함수로 보여줄 수 있습니다.
- 그래프에 다양한 항목을 표현할 수 있고 어떤 플랫폼에서든 거의 모든 브라우저에서 액세스할 수 있습니다.
- Cacti는 PHP로 주로 작성되어 있습니다.

<br/>

## Cacti 설치

### 일반적인 사용 명령어

```bash
sudo apt-get install cacti
```

[좀 더 자세하게 보기위해서는...](https://yongho1037.tistory.com/553)

위 글을 참고하면서 사용하면 좋을 듯합니다.

### Redis 사용

```bash
sudo -u cacti php /usr/share/cacti/scripts/ss_get_by_ssh.php --type redis --host 127.0.0.1 --items ln,lo
```

---

**출처**

- https://yongho1037.tistory.com/553
- https://docs.cacti.net/
- https://www.percona.com/doc/percona-monitoring-plugins/1.1/cacti/redis-templates.html
- https://server-talk.tistory.com/148
