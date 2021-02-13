---
title: '[Springboot] 스프링부트 Poi 사용하기'
slug: 00-springboot-poi
date: 2021-02-08
published: true
tags: ['Spring', 'Springboot', 'Poi', 'Backend']
series: false,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: ' Springboot Poi에 대한 간단한 실습입니다. '
---

# Springboot에서 POI 사용

오늘은 간단하게 POI에 대한 개념을 정리하고, Apache POI를 사용한 간단한 샘플 코드를 보겠습니다.

<br/>

## Apache POI란.

아파치 POI는 아파치 소프트웨어 재단에서 만든 라이브러리로서 **MS Office 파일 포맷을 순수 자바 언어로서 읽고 쓰는 기능을 제공**합니다.

엑셀(xlsx), 피피티(ppt) 등을 제공합니다.

<br/>

## POI를 적용한 간단한 코드

[해당 링크](https://shinsunyoung.tistory.com/71)에 있는 코드를 따라했습니다.

엑셀 파일을 읽어서 웹으로 보여주는 간단한 서비스입니다.

### 프로젝트 구성

프로젝트 구성은 다음과 같습니다.

> 프로젝트 간략하게 보기.

![project-layer](https://user-images.githubusercontent.com/42582516/107708264-8f84ab80-6d06-11eb-9425-85840ccfb64b.png)

간단한 서비스이므로 다음과 같이 구성하였습니다.

> build.gradle

```gradle
plugins {
  id 'org.springframework.boot' version '2.4.2'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

group = 'com.myepark'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
  compileOnly {
    extendsFrom annotationProcessor
  }
}

repositories {
  mavenCentral()
}

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
  implementation 'org.springframework.boot:spring-boot-starter-web'
  compileOnly 'org.projectlombok:lombok'

  compile group: 'org.apache.poi', name: 'poi', version: '3.11'
  compile group: 'org.apache.poi', name: 'poi-ooxml', version: '3.11'
  compile group: 'commons-io', name: 'commons-io', version: '2.4'

  developmentOnly 'org.springframework.boot:spring-boot-devtools'
  annotationProcessor 'org.projectlombok:lombok'
  testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
  useJUnitPlatform()
}
```

> excel sample

| 번호 | 이름  | 이메일        |
| ---- | ----- | ------------- |
| 1    | Hello | test@test.com |

다음과 같이 데이터가 xlsx파일에 저장되어 있습니다.

### 컨트롤러

> ExcelData

```java
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ExcelData {

    private Integer num;

    private String name;

    private String email;

}
```

Excel의 데이터 형태입니다.

> ExcelController

```java
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ExcelController {
    @GetMapping("/excel")
    public String main() {
        return "excel";
    }

    @PostMapping("/excel/read")
    public String readExcel(@RequestParam("file") MultipartFile file, Model model)
            throws IOException {

        List<ExcelData> dataList = new ArrayList<>();

        String extension = FilenameUtils.getExtension(file.getOriginalFilename());

        if (!extension.equals("xlsx") && !extension.equals("xls")) {
            throw new IOException("엑셀파일만 업로드 해주세요.");
        }

        Workbook workbook = null;

        if (extension.equals("xlsx")) {
            workbook = new XSSFWorkbook(file.getInputStream());
        } else if (extension.equals("xls")) {
            workbook = new HSSFWorkbook(file.getInputStream());
        }

        Sheet worksheet = workbook.getSheetAt(0);

        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {

            Row row = worksheet.getRow(i);

            ExcelData data = new ExcelData();

            data.setNum((int) row.getCell(0).getNumericCellValue());    // 실수
            data.setName(row.getCell(1).getStringCellValue());          // 문자열
            data.setEmail(row.getCell(2).getStringCellValue());         // 논리

            dataList.add(data);
        }

        model.addAttribute("datas", dataList);

        return "excelList";
    }
}
```

### 웹

Thymeleaf을 사용한 코드입니다.

> excel.html

```html
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
  <head>
    <meta charset="UTF-8" />
    <title>엑셀 업로드</title>
  </head>

  <body>
    <form
      th:action="@{/excel/read}"
      method="POST"
      enctype="multipart/form-data"
    >
      <input type="file" th:name="file" />
      <input th:type="submit" value="제출" />
    </form>
  </body>
</html>
```

다음 form을 통해서 file을 입력 받습니다.

> excelList.html

```html
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>

    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"
    />
  </head>
  <body>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">이름</th>
          <th scope="col">이메일</th>
        </tr>
      </thead>
      <tbody>
        <tr th:each="data : ${datas}">
          <td scope="row" th:text="${data.num}"></td>
          <td th:text="${data.name}"></td>
          <td th:text="${data.email}"></td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

해당 웹 페이지를 통해서 데이터를 확인합니다.

<br/>

## 마무리.

간단한 샘플 코드를 통해서 poi가 어떻게 동작하는지를 이해했습니다.

---

**출처**

- https://shinsunyoung.tistory.com/71
- https://ko.wikipedia.org/wiki/%EC%95%84%ED%8C%8C%EC%B9%98_POI
