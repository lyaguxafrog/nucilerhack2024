# Nuclier Hack

## About
<!-- Yor description here -->

## Stack:
* Django
* DRF
* PostgreSQL
* Docker + Docker-compose
* Gunicorn
---
## Develop:

To work with the project, you need to install [vscode](https://code.visualstudio.com/) and [vscode-remote-containers](https://code.visualstudio.com/docs/remote/containers).

### Config
To generate a config:
```bash
./deploy.sh config
```

### Environment variables
 * `SECRET_KEY` - Django secret key. For generate new once, you can use service https://djecrety.ir/
 * `DEBUG` - Flag to tell django work on debug mode or not.
* `DB_NAME` - PostgreSQL db name.
* `DB_USER` - PostgreSQL db user.
* `DB_PASSWORD` - PostgeSQL db password.


### Codding

For developing backend with django, open django project in vscode and reopen it in container.


```bash
code kernel
```

![reopen](https://github.com/lyaguxafrog/python-backend-devcontainers/blob/release/docs/pics/reopen.png?raw=true)

For migrate:
```bash
./manage.sh migrate
```

For create new django app:
```bash
./manage.sh app
```

It will create new django app with this structure:
```
app/
├── admin
│   └── __init__.py
├── apps.py
├── __init__.py
├── models
│   └── __init__.py
├── serializers
│   └── __init__.py
├── views
│   └── __init__.py
└── services
    └── __init__.py
```

Create superuser:
```bash
./manage.sh su
```

To debug django code use cmd+F5

Open http://localhost:8000 you will see this and this is normall. There is no builded webclient.

![localhost](https://github.com/lyaguxafrog/python-backend-devcontainers/blob/release/docs/pics/localhost_8000.png?raw=true)

Open http://localhost:8000/admin to see admin dashboard.


### Deploy
For deploy run:
```bash
deploy.sh
```

On local machine app will running on http://0.0.0.0/

# GitFlow

### Основные ветки

**develop:** основная рабочая ветвь. Все новые ветки создаём из неё.  Она содержит код, готовый для тестирования.

**release**: содержит стабильный протестированный код. Код в этой ветке всегда готов к деплою на продакшн.

**Нельзя** делать коммиты напрямую в `develop` и `release,` только в свои фичи-ветки (feature branches).

### Ветки и таски

* На каждую задачу создается отдельная ветка. Вся работа над задачей ведется в этой ветке.

* Формат имени ветки: (фича **feature/name**, фикс **fix/name**) и одно или несколько английских слов, описывающих задачу, через дефисы.

* Смердженные ветки удаляются после PR, **но только когда все изменения приняты, проверены и внесены правки.**

*  Следующую ветку проекта в идеале нужно создавать после того, как приняли и смерджили предыдущие задачи с одной из основных веток для того, чтобы не переделывать в старых ветках те изменения, которые были внесены на проверке PR.

* Каждый PR должен быть рабочей версией проекта, которую можно запустить или залить на сервер.

* Можно параллельно делать несколько задач и сдавать их сразу несколько, но тогда нужно вносить изменения по одному из PR в каждую ветку из активных задач

### Как писать коммиты

**4 вида коммитов**

`[*]` - рефакторинг\изменения логики, исправление багов

`[+]` - добавление фичи

`[-]` - удаление файла\фичи

`[~]` - правки, не влияющие на логику проекта (например, линтеры)

**В каждом коммите следует писать Reason(R:) и fixed by(FB:)**

**R**: причина коммита, что этот коммит изменил

**FB**: как исправили, каким способом решили проблему

**Пример правильного коммита:**

[~] правки форматирования и lint

R: код был не оптимальным и плохо форматированным

FB: использовал eslint и prettier

### Как оформлять PR

1. **Заголовок**

В заголовке следует назвать реализованный функционал (что было добавлено, кратко). В самом начале надо указать `BUGFIX` (в случае, если были исправления багов) или `FEAT` (добавление нового функционала). Если PR ещё не готов к просмотру, следует пометить его как черновик (Draft).

2. **Описание**

В описании есть два основных пункта:

* Что было сделано (краткое описание основного функционала приложения)

* Отчет о тестировании (описание тестирования конкретного функционала)

3. **Reviewer**

**Обязательно сделать review-request** на [@lyaguxafrog](https://github.com/lyaguxafrog), если задача связана с Backend'ом или CI/CD, или [@talkingmachine](https://github.com/talkingmachine), если задача связана с Frontend'ом.

### Объем изменений в PR

Изменений в каждом mr должно быть не более 500 строк (добавление и удаление в сумме).


